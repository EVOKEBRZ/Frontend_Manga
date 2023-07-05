import PropTypes from 'prop-types';

function Subtitle({subtitle}){

  return <h2>{subtitle}</h2>
}

Subtitle.propTypes = {
  subtitle: PropTypes.string
}

export default Subtitle;