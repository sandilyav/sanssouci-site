import clsx from 'clsx';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { ACTIVITY_META, RATING_COPY, WINDOW_BLOCKS } from '../../config/bttv';
import { useBestTimesData } from '../../hooks/useBestTimesData';
import type { ActivityScore, DayRecommendations, WindowRecommendation } from '../../types/bttv';
import Icon, { type IconName } from './Icon';

const ratingClassMap = {
  perfect: 'bttv-circle--perfect',
  good: 'bttv-circle--good',
  not_ideal: 'bttv-circle--neutral'
} as const;

const timeFormatter = new Intl.DateTimeFormat('en-IN', {
  hour: 'numeric',
  minute: '2-digit'
});

const formatRange = (startIso: string, endIso: string) => {
  const start = new Date(startIso);
  const end = new Date(endIso);
  return `${timeFormatter.format(start)} – ${timeFormatter.format(end)}`;
};

const summarizeWindowBody = (window: WindowRecommendation) => {
  const prefix = `${window.label}: `;
  return window.summary.startsWith(prefix) ? window.summary.slice(prefix.length) : window.summary;
};

const blockLabelMap: Record<string, string> = WINDOW_BLOCKS.reduce(
  (acc, block) => ({ ...acc, [block.id]: block.label }),
  {} as Record<string, string>
);

const getActivityMeta = (key: ActivityScore['key']) =>
  (ACTIVITY_META as Record<string, (typeof ACTIVITY_META)[keyof typeof ACTIVITY_META]>)[key] ?? null;

const normalizeActivities = (activities: ActivityScore[]) => {
  const known = activities.filter((activity) => Boolean(getActivityMeta(activity.key)));
  return known.length ? known : activities;
};

const getPrimaryActivity = (activities: ActivityScore[]) => normalizeActivities(activities)[0];

const getSecondaryActivities = (activities: ActivityScore[]) =>
  normalizeActivities(activities)
    .slice(1)
    .filter((activity) => activity.score >= 60);

const metricItems = (window: WindowRecommendation) => [
  {
    icon: 'wind',
    label: `${Math.round(window.metrics.windSpeed)} km/h wind`
  },
  {
    icon: 'tide',
    label: `${window.metrics.tideState === 'high' ? 'High' : window.metrics.tideState} tide`
  },
  {
    icon: 'thermo',
    label: `${Math.round(window.metrics.temperature)}°C`
  },
  window.metrics.sunrise
    ? { icon: 'sunrise', label: 'Sunrise within window' }
    : window.metrics.sunset
      ? { icon: 'sunset', label: 'Sunset glow' }
      : null
].filter(Boolean) as Array<{ icon: IconName; label: string }>;

const ActivityChips = ({ window }: { window: WindowRecommendation }) => {
  const primaryActivity = getPrimaryActivity(window.activities);
  const secondaries = getSecondaryActivities(window.activities);
  const primaryMeta = getActivityMeta(primaryActivity.key);
  const primaryCopy = window.rating === 'perfect' ? 'Perfect for' : 'Good for';

  return (
    <>
      <span
        className={clsx(
          'bttv-chip',
          'bttv-chip--primary',
          primaryMeta && `bttv-chip--activity-${primaryActivity.key}`
        )}
      >
        <Icon name={(primaryMeta?.icon ?? 'leaf') as IconName} size={16} aria-hidden />
        {primaryCopy} {primaryMeta?.label ?? primaryActivity.label}
      </span>
      {secondaries.map((activity) => {
        const meta = getActivityMeta(activity.key);
        return (
          <span
            key={activity.key}
            className={clsx('bttv-chip', 'bttv-chip--secondary', meta && `bttv-chip--activity-${activity.key}`)}
          >
            <Icon name={(meta?.icon ?? 'leaf') as IconName} size={16} aria-hidden />
            Good for {meta?.label ?? activity.label}
          </span>
        );
      })}
    </>
  );
};

const DetailSheet = ({ window, onClose }: { window: WindowRecommendation; onClose: () => void }) => {
  const primaryActivity = getPrimaryActivity(window.activities);
  const eyebrowMeta = getActivityMeta(primaryActivity.key);
  return (
    <div className="bttv-sheet" role="dialog" aria-modal="true" aria-label="Best time window details">
      <div className="bttv-sheet__body">
        <button className="bttv-sheet__close" type="button" onClick={onClose}>
          Close
        </button>
        <p className="bttv-sheet__eyebrow">{eyebrowMeta?.label ?? primaryActivity.label}</p>
        <h4>{window.label}</h4>
        <p>{summarizeWindowBody(window)}</p>

        <div className="bttv-sheet__chips">
          <ActivityChips window={window} />
        </div>
        <dl>
          {metricItems(window).map((metric) => (
            <Fragment key={metric.label}>
              <dt>
                <Icon name={metric.icon} size={16} aria-hidden />
              </dt>
              <dd>{metric.label}</dd>
            </Fragment>
          ))}
        </dl>
        <button className="button button-primary bttv-sheet__cta" type="button">
          Plan for this window
        </button>
      </div>
      <div className="bttv-sheet__scrim" onClick={onClose} />
    </div>
  );
};

const bestWindowForDay = (day?: DayRecommendations) => {
  if (!day || !day.windows.length) return null;
  return [...day.windows].sort((a, b) => b.primaryScore - a.primaryScore)[0];
};

const VISIBLE_COLUMNS = 5;

const BestTimeToVisitPanel = () => {
  const { data, loading, error } = useBestTimesData();
  const [sheetWindow, setSheetWindow] = useState<WindowRecommendation | null>(null);
  const [selectedWindow, setSelectedWindow] = useState<WindowRecommendation | null>(null);
  const [windowStart, setWindowStart] = useState(0);

  const days = data?.days ?? [];

  const maxStart = Math.max(0, days.length - VISIBLE_COLUMNS);
  const clampedStart = Math.min(windowStart, maxStart);
  const visibleDays = days.slice(clampedStart, clampedStart + VISIBLE_COLUMNS);

  const monthLabel = useMemo(() => {
    if (!visibleDays.length) return '';
    const firstDate = new Date(visibleDays[0].date);
    return firstDate.toLocaleDateString('en-IN', { month: 'long' });
  }, [visibleDays]);

  const windowLookup = useMemo(() => {
    const map: Record<string, Record<string, WindowRecommendation>> = {};
    days.forEach((day) => {
      map[day.id] = day.windows.reduce((acc, window) => {
        acc[window.blockId] = window;
        return acc;
      }, {} as Record<string, WindowRecommendation>);
    });
    return map;
  }, [days]);

  useEffect(() => {
    if (windowStart > maxStart) {
      setWindowStart(maxStart);
    }
  }, [windowStart, maxStart]);

  useEffect(() => {
    const currentDay = visibleDays[0] ?? days[0];
    if (!selectedWindow && currentDay) {
      setSelectedWindow(bestWindowForDay(currentDay));
    }
  }, [visibleDays, days, selectedWindow]);

  useEffect(() => {
    if (!sheetWindow) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSheetWindow(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [sheetWindow]);

  const handleSelectWindow = (timeWindow: WindowRecommendation) => {
    if (typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches) {
      setSheetWindow(timeWindow);
    }
    setSelectedWindow(timeWindow);
  };

  const detailWindow = selectedWindow;

  return (
    <div className="bttv-panel">
      <div className="bttv-panel__header">
        <div>
          <p className="bttv-panel__eyebrow">Intelligent tide + light guide</p>
          <h3>Best time to visit</h3>
        </div>
        <div className="bttv-panel__legend">
          {(['kayaking', 'photography', 'leisure'] as const).map((key) => (
            <span key={key}>
              <i className={clsx('bttv-dot', `bttv-dot--activity-${key}`)} aria-hidden />
              {ACTIVITY_META[key].label}
            </span>
          ))}
        </div>
      </div>

      {loading && (
        <div className="bttv-skeleton" aria-live="polite">
          <div className="bttv-skeleton__row" />
          <div className="bttv-skeleton__row" />
          <div className="bttv-skeleton__row" />
        </div>
      )}

      {error && !loading && (
        <div className="bttv-fallback">
          <p>Conditions are taking a moment to load.</p>
          <p className="bttv-fallback__sub">{error}</p>
        </div>
      )}

      {!loading && !error && days.length === 0 && (
        <div className="bttv-fallback">
          <p>Conditions moderate this week. Morning visits recommended.</p>
        </div>
      )}

      {!loading && !error && days.length > 0 && (
        <div className="bttv-grid" aria-label="Best time windows">
          {visibleDays.length > 0 && (
            <div className="bttv-grid-track">
              <table className="bttv-grid-table" aria-live="polite">
                <thead>
                  {monthLabel && (
                    <tr className="bttv-grid-row--month">
                      <th scope="col" aria-hidden />
                      <th scope="col" colSpan={visibleDays.length} aria-label="Month">
                        {monthLabel}
                      </th>
                    </tr>
                  )}
                  <tr className="bttv-grid-row--dates">
                    <th scope="col" aria-hidden />
                    {visibleDays.map((day) => {
                      const date = new Date(day.date);
                      const dayOfMonth = date.toLocaleDateString('en-IN', { day: 'numeric' });
                      return (
                        <th key={`${day.id}-date`} scope="col" aria-label={`Date ${dayOfMonth}`}>
                          {dayOfMonth}
                        </th>
                      );
                    })}
                  </tr>
                  <tr className="bttv-grid-row--days">
                    <th scope="col" aria-hidden />
                    {visibleDays.map((day) => {
                      const date = new Date(day.date);
                      const weekday = date
                        .toLocaleDateString('en-IN', { weekday: 'short' })
                        .charAt(0)
                        .toUpperCase();
                      return (
                        <th key={`${day.id}-day`} scope="col" aria-label={date.toLocaleDateString('en-IN', {
                          weekday: 'long'
                        })}>
                          {weekday}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {WINDOW_BLOCKS.map((block) => (
                    <tr key={block.id}>
                      <th scope="row">{block.label}</th>
                      {visibleDays.map((day) => {
                        const window = windowLookup[day.id]?.[block.id];
                        if (!window) {
                          return (
                            <td key={`${day.id}-${block.id}`}>
                              <span className="bttv-circle bttv-circle--empty" aria-hidden />
                            </td>
                          );
                        }
                        const primaryActivity = getPrimaryActivity(window.activities);
                        const primaryMeta = getActivityMeta(primaryActivity.key);
                        const isSelected = detailWindow?.id === window.id;
                        return (
                          <td key={window.id}>
                            <button
                              type="button"
                              className={clsx(
                                'bttv-circle',
                                ratingClassMap[window.rating],
                                primaryMeta && `bttv-circle--activity-${primaryActivity.key}`,
                                isSelected && 'bttv-circle--selected'
                              )}
                              aria-label={`${day.label} ${block.label} is ${RATING_COPY[window.rating].title}`}
                              onClick={() => handleSelectWindow(window)}
                            />
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
              {days.length > VISIBLE_COLUMNS && (
                <div className="bttv-grid-scroll">
                  <input
                    type="range"
                    min={0}
                    max={maxStart}
                    step={1}
                    value={clampedStart}
                    onChange={(event) => setWindowStart(Number(event.target.value))}
                    aria-label="Scroll best time calendar"
                  />
                  <span>
                    Showing days {clampedStart + 1}–{Math.min(days.length, clampedStart + VISIBLE_COLUMNS)} of {days.length}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {detailWindow && (
        <div className="bttv-detail" aria-live="polite">
          <div>
            <p className="bttv-detail__eyebrow">{RATING_COPY[detailWindow.rating].title}</p>
            <h4>{detailWindow.label}</h4>
            <p className="bttv-detail__summary">{summarizeWindowBody(detailWindow)}</p>
            <div className="bttv-detail__chips">
              <ActivityChips window={detailWindow} />
            </div>
          </div>
          <ul className="bttv-detail__metrics">
            {metricItems(detailWindow).map((metric) => (
              <li key={metric.label}>
                <Icon name={metric.icon} size={16} aria-hidden />
                <span>{metric.label}</span>
              </li>
            ))}
          </ul>
          <Link to="/plan" className="button button-primary bttv-detail__cta">
            Plan for this window
          </Link>
          <button
            type="button"
            className="button button-secondary bttv-detail__mobile"
            onClick={() => handleSelectWindow(detailWindow)}
          >
            View mobile details
          </button>
        </div>
      )}

      {sheetWindow && <DetailSheet window={sheetWindow} onClose={() => setSheetWindow(null)} />}
    </div>
  );
};

export default BestTimeToVisitPanel;
