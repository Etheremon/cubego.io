import React from "react"
import PropTypes from "prop-types";
import {GetValues} from "../../../utils/objUtils";
import {SpriteSource} from "../../../constants/sprite";
import {SpriteSheet} from "../../widgets/SpriteSheet/SpriteSheet.jsx";

require("style-loader!./Loading.scss");


const Loading = ({type, dark, className}) => {
  if (type === Loading.types.DOG)
    return (
      <div className={'loading dog'}>
        <SpriteSheet image={SpriteSource.BUILD_GON.image}
                     frameWidth={SpriteSource.BUILD_GON.frameWidth}
                     frameHeight={SpriteSource.BUILD_GON.frameHeight}
                     steps={SpriteSource.BUILD_GON.steps}
                     cols={SpriteSource.BUILD_GON.cols}
                     fps={SpriteSource.BUILD_GON.fps}
        />
      </div>
    );

  return (
    <div className={`loading-dots ${dark ? 'dark' : ''} ${className}`}>
      <div className="loading-dots--dot"/>
      <div className="loading-dots--dot"/>
      <div className="loading-dots--dot"/>
    </div>
  );
};

Loading.types = {
  NORMAL: 'normal',
  DOG: 'dog',
};

Loading.defaultProps = {
  type: Loading.types.NORMAL,
  dark: false,
};

Loading.propTypes = {
  dark: PropTypes.bool,
  type: PropTypes.oneOf([...GetValues(Loading.types)]),
};


export default Loading;
