import React, { memo } from 'react';
import { VALUES } from '../constants/scales';

const Scale = memo(({ voted, points, scale, selectPointsAction }) => {
  return (
    <div className="room-content__slider">
      {!voted ? (
        <div className="uk-position-relative uk-visible-toggle uk-light" uk-slider="finite: true">
          <div className="uk-slider-container">
            <ul className="uk-slider-items uk-child-width-1-3">
              {['?', ...VALUES[scale]].map(value => (
                <li
                  key={`point-${value}`}
                  className={points === value ? 'point-selected' : undefined}
                  onClick={_ => selectPointsAction(value)}
                >
                  <div className="uk-position-center uk-panel">
                    <h1>{value}</h1>
                  </div>
                </li>
              ))}
            </ul>
            {/* // TODO: switch these to buttons */}
            <a
              className="uk-position-center-left uk-position-small"
              href="#"
              uk-slidenav-previous="true"
              uk-slider-item="previous"
            >
              <span uk-icon="icon: chevron-left; ratio: 1.5" />
            </a>
            <a
              className="uk-position-center-right uk-position-small"
              href="#"
              uk-slidenav-next="true"
              uk-slider-item="next"
            >
              <span uk-icon="icon: chevron-right; ratio: 1.5" />
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
});

export default Scale;
