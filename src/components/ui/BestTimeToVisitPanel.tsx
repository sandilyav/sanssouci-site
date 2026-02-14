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

const blockLabelMap: Record<string, string> = WINDOW_BLOCKS.reduce(
  (acc, block) => ({ ...acc, [block.id]: block.label }),
  {} as Record<string, string>
);

const getPrimaryActivities = (activities: ActivityScore[]) => {
  const qualifying = activities.filter((activity) => activity.score >= 75);
  if (qualifying.length >= 2) return qualifying.slice(0, 2);
  if (qualifying.length === 1) return qualifying;
  return activities.slice(0, 1);
};

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

const DetailSheet = ({ window, onClose }: { window: WindowRecommendation; onClose: () => void }) => (
  <div className="bttv-sheet" role="dialog" aria-modal="true" aria-label="Best time window details">
    <div className="bttv-sheet__body">
      <button className="bttv-sheet__close" type="button" onClick={onClose}>
        Close
      </button>
      <p className="bttv-sheet__eyebrow">{RATING_COPY[window.rating].title}</p>
      <h4>{window.label}</h4>
      <p>{window.summary}</p>
      <div className="bttv-sheet__chips">
        {getPrimaryActivities(window.activities).map((activity) => (
          <span key={activity.key} className="bttv-chip">
            <Icon name={ACTIVITY_META[activity.key].icon} size={16} aria-hidden />
            {ACTIVITY_META[activity.key].label}
          </span>
        ))}
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

const bestWindowForDay = (day?: DayRecommendations) => {
  if (!day || !day.windows.length) return null;
  return [...day.windows].sort((a, b) => b.overallScore - a.overallScore)[0];
};

const BestTimeToVisitPanel = () => {
  const { data, loading, error } = useBestTimesData();
  const [sheetWindow, setSheetWindow] = useState<WindowRecommendation | null>(null);
  const [selectedWindow, setSelectedWindow] = useState<WindowRecommendation | null>(null);

  const days = data?.days ?? [];

  const visibleDays = days.slice(0, 5);

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

  const footerCopy = useMemo(() => {
    if (!data) return null;
    const updated = new Date(data.generatedAt);
    const formatted = new Intl.DateTimeFormat('en-IN', {
      hour: 'numeric',
      minute: '2-digit'
    }).format(updated);
    return `Updated ${formatted}`;
  }, [data]);

  return (
    <div className="bttv-panel">
      <div className="bttv-panel__header">
        <div>
          <p className="bttv-panel__eyebrow">Intelligent tide + light guide</p>
          <h3>Best time to visit</h3>
        </div>
        <div className="bttv-panel__legend">
          <span>
            <i className="bttv-dot bttv-dot--perfect" aria-hidden /> Perfect
          </span>
          <span>
            <i className="bttv-dot bttv-dot--good" aria-hidden /> Good
          </span>
          <span>
            <i className="bttv-dot bttv-dot--neutral" aria-hidden /> Not ideal
          </span>
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
                      const isSelected = detailWindow?.id === window.id;
                      return (
                        <td key={window.id}>
                          <button
                            type="button"
                            className={clsx('bttv-circle', ratingClassMap[window.rating], isSelected && 'bttv-circle--selected')}
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
          )}
        </div>
      )}

      {detailWindow && (
        <div className="bttv-detail" aria-live="polite">
          <div>
            <p className="bttv-detail__eyebrow">{RATING_COPY[detailWindow.rating].title}</p>
            <h4>{detailWindow.label}</h4>
            <p className="bttv-detail__time">{formatRange(detailWindow.start, detailWindow.end)}</p>
            <p className="bttv-detail__summary">{detailWindow.summary}</p>
            <div className="bttv-detail__chips">
              {getPrimaryActivities(detailWindow.activities).map((activity) => (
                <span key={activity.key} className="bttv-chip">
                  <Icon name={ACTIVITY_META[activity.key].icon} size={16} aria-hidden />
                  {ACTIVITY_META[activity.key].label}
                </span>
              ))}
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
