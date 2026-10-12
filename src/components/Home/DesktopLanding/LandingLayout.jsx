import PropTypes from 'prop-types';

import CircuitPattern from './CircuitPattern';
import LandingCenterpiece from './LandingCenterpiece';
import LandingNav from './LandingNav';
import SideRails from './SideRails';


const LandingLayout = ({
  motionOK,
  onCategoryClick,
  onBuilder,
  onConditionsClick,
  children,
}) => (
  <div className="landing-root relative overflow-x-clip">
    {/* Fondo: pattern de circuito (detrás de todo el landing) */}
    <CircuitPattern className="pointer-events-none absolute inset-0 z-0" />

    {/* Pieza central persistente (puño/rayo) — sigue el scroll */}
    <LandingCenterpiece />

    {/* Header sticky */}
    <LandingNav onCategoryChange={onCategoryClick} />

    {/* Sidebars laterales (sticky, siempre presentes) */}
    <SideRails
      motionOK={motionOK}
      onCategoryClick={onCategoryClick}
      onBuilder={onBuilder}
      onConditionsClick={onConditionsClick}
    />

    {/* Main: slot de secciones (cada una define sus dimensiones/divisores) */}
    <main className="relative">{children}</main>
  </div>
);

LandingLayout.propTypes = {
  motionOK: PropTypes.bool,
  onCategoryClick: PropTypes.func,
  onBuilder: PropTypes.func,
  onConditionsClick: PropTypes.func,
  children: PropTypes.node,
};

export default LandingLayout;
