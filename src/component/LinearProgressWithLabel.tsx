import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const ColorLinearProgress = withStyles(() => ({
    colorPrimary: {
        backgroundColor: '#D2D6D9'
    },
    bar: {
        backgroundColor: '#4D5EE0'
    }
}))(LinearProgress);

interface Props {
    label: string,
    value: number
}

function LinearProgressWithLabel(props: Props) {
    return (
        <div>
            <div style={{color: 'black'}}>{props.label}</div>
            <Box
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '12px'
                }}
            >
                <Box width="312px" mr={1}>
                    <ColorLinearProgress
                        variant="determinate"
                        style={{ height: '8px' }}
                        {...props}
                    />
                </Box>
                <Box minWidth={35} display="none">
                    <Typography variant="body2" color="textSecondary">
                        {`${Math.round(props.value)}%`}
                    </Typography>
                </Box>
            </Box>
        </div>
    );
}

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
    root: {
        width: '448px',
        height: '200px',
        backgroundColor: '#FFFFFF',
        border: '1px solid #00000000',
        borderRadius: '4px'
    }
});

interface LabelProps {
    label: string,
    progress: number
}

function LinearWithValueLabel(props: LabelProps) {
    const classes = useStyles();
    const [progress, setProgress] = React.useState(props.progress || 5);
    const label = props.label || 'Loading...';

    React.useEffect(() => {
        console.log('start interval');
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 100 : prevProgress + 5));
        }, 1000);
        return () => {
            console.log('stop interval');
            clearInterval(timer);
        };
    }, []);

    return (
        <div className={classes.container}>
            <div className={classes.root}>
                <LinearProgressWithLabel label={label} value={progress} />
            </div>
        </div>
    );
}

export default LinearWithValueLabel;
