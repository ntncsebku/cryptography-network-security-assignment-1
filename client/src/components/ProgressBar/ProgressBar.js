import React, { PureComponent } from 'react';

import Socket from '../../socket';
import * as sharedConstants from '../../shares/constants';

import './ProgressBar.css';

class ProgressBar extends PureComponent {
    state = {
        percentage: 0
    }

    componentDidMount = () => {
        const socket = Socket.getInstance();

        socket.on(sharedConstants.SERVER_SENDS_PROCESSING_PROGRESS, () => {
            this.setState(prevState => {
                if (prevState.percentage + 5 < 100) return { percentage: prevState.percentage + 5 };
                else return { percentage: 100 };
            });
        });

        socket.on(sharedConstants.SERVER_FINISHES_ENCRYPTION, () => {
            this.setState({ percentage: 100 });
        });
    }

    componentDidUpdate = () => {
        console.log(this.state.percentage);
    }

    render() {
        if (this.props.isUploading) return <div className="LoadingBar" />;

        if (this.props.isProcessing) return <div className="ProgressBar" style={{ width: `${this.state.percentage.toString()}%` }} />;

        return null;
    }
}

export default ProgressBar;