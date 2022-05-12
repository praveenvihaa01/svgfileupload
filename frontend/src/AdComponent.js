import React, { Component } from 'react';
import PropTypes from 'prop-types';

const googleAdId = 'ca-pub-4513666647383140';

class AdComponent extends Component {
    googleInit = null;

    componentDidMount() {
        const { timeout } = this.props;
        this.googleInit = setTimeout(() => {
            if (typeof window !== 'undefined')
                (window.adsbygoogle = window.adsbygoogle || []).push({});
        }, timeout);
    }

    componentWillUnmount() {
        if (this.googleInit) clearTimeout(this.googleInit);
    }

    render() {
        const { slot } = this.props;
        return (
            <div>
                <ins
                    className="adsbygoogle"
                    style={{ display: 'block' }}
                    data-ad-client={googleAdId}
                    data-ad-slot={slot}
                    data-ad-format="auto"
                    data-full-width-responsive="true"
                    data-adtest="on"
                ></ins>
            </div>
        );
    }
}

AdComponent.propTypes = {
    classNames: PropTypes.string,
    slot: PropTypes.string,
    timeout: PropTypes.number,
};

AdComponent.defaultProps = {
    classNames: '',
    timeout: 200,
};

export default AdComponent;

