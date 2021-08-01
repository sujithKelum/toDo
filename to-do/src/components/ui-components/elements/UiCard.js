import React, { Fragment } from 'react';
import Card from '@material-ui/core/Card';

const UICard = ({
    elementStyle = '',
    children = null,
  }) => {
    return (
      <div className={`defaultBGWrapper BGWrapper`}>
        <Card
          className={`defaultCardWrapper CardWrapper ${elementStyle}`}
        >
          <Fragment>{children}</Fragment>
        </Card>
      </div>
    );
  };

  export {UICard}