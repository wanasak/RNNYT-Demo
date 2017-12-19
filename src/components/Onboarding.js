import React, { Component } from "react";
import {
    LayoutAnimation,
    StyleSheet,
    View,
    Animated,
    PanResponder
} from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";

import CollapsibleView from "../components/CollapsibleView";
import OnboardingButtons from "../components/OnboardingButtons";
import OnboardingPanel from "../components/OnboardingPanel";
import OnboardingProgress from "../components/OnboardingProgress";
import onboardingContent from "../config/onboarding";
import AppText from "./AppText";
import { ACCENT_COLORS } from "../styles/global";
import { DEVICE_WIDTH } from "../config/device";

class Onboarding extends Component {
    constructor(props) {
        super(props);

        this.moveNext = this.moveNext.bind(this);
        this.movePrevious = this.movePrevious.bind(this);
        this.transitionToNextPanel = this.transitionToNextPanel.bind(this);
        this.moveFinal = this.moveFinal.bind(this);

        this.state = {
            currentIndex: 0,
            isDone: false,
            pan: new Animated.Value(0)
        };
    }

    componentWillMount() {
        this.dragPosition = 0;
        this.panListener = this.state.pan.addListener(value => {
            this.dragPosition = value.value;
        });

        this.panResponsder = PanResponder.create({
            // อนุญาติ
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                this.state.pan.setOffset(this.dragPosition);
                this.state.pan.setValue(0);
            },
            onPanResponderMove: (e, gestureState) => {
                // ระยะทางที่เลื่อนในแกน x
                this.state.pan.setValue(gestureState.dx);
            },
            // เอานิ้วออก
            onPanResponderRelease: e => {
                // ดูว่าไปทางซ้ายไหม
                const movedLeft = e.nativeEvent.pageX < DEVICE_WIDTH / 2;
                let updateState = false;
                let toValue = movedLeft
                    ? DEVICE_WIDTH * (this.state.currentIndex + 1) * -1
                    : DEVICE_WIDTH * (this.state.currentIndex - 1) * -1;

                if (toValue > 0) {
                    toValue = 0;
                } else if (
                    toValue <
                    (DEVICE_WIDTH * onboardingContent.length - DEVICE_WIDTH) *
                        -1
                ) {
                    toValue =
                        (DEVICE_WIDTH * onboardingContent.length -
                            DEVICE_WIDTH) *
                        -1;
                } else {
                    updateState = true;
                }

                this.state.pan.flattenOffset();

                if (updateState) {
                    this.transitionToNextPanel(
                        movedLeft
                            ? this.state.currentIndex + 1
                            : this.state.currentIndex - 1
                    );
                } else {
                    Animated.spring(this.state.pan, {
                        velocity: 0.5,
                        tensions: 0.2,
                        friction: 2,
                        toValue
                    }).start();
                }
            }
        });
    }

    componentWillUnmount() {
        this.state.pan.removeListener(this.panListener);
    }

    moveNext() {
        this.transitionToNextPanel(this.state.currentIndex + 1);
    }

    movePrevious() {
        this.transitionToNextPanel(this.state.currentIndex - 1);
    }

    // transitionToNextPanel(nextIndex) {
    //     LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    //     // LayoutAnimation.configureNext({
    //     //     duration: 3000,
    //     //     update: {
    //     //         springDamping: 0.2,
    //     //         type: LayoutAnimation.Types.spring,
    //     //         property: LayoutAnimation.Properties.scaleXY
    //     //     }
    //     // });
    //     this.setState({
    //         currentIndex: nextIndex
    //     });
    // }

    transitionToNextPanel(nextIndex) {
        Animated.timing(this.state.pan, {
            toValue: nextIndex * DEVICE_WIDTH * -1,
            duration: 300
        }).start(() => {
            this.setState({ currentIndex: nextIndex });
        });
    }

    moveFinal() {
        LayoutAnimation.configureNext({
            duration: 1250,
            update: {
                springDamping: 0.4,
                type: LayoutAnimation.Types.spring
            }
        });

        this.setState({
            isDone: true
        });

        setTimeout(() => {
            this.props.homeScreen();
        }, 2000);
    }

    render() {
        return (
            <View style={styles.container}>
                <CollapsibleView
                    hide={this.state.isDone}
                    style={[
                        styles.container,
                        {
                            backgroundColor:
                                onboardingContent[this.state.currentIndex]
                                    .backgroundColor
                        }
                    ]}
                >
                    <Animated.View
                        {...this.panResponsder.panHandlers}
                        style={[
                            styles.panelContainer,
                            { width: DEVICE_WIDTH * onboardingContent.length },
                            {
                                transform: [
                                    {
                                        translateX: this.state.pan
                                    }
                                ]
                            }
                        ]}
                    >
                        {onboardingContent.map((panel, i) => (
                            <OnboardingPanel key={i} {...panel} />
                        ))}
                    </Animated.View>
                    <OnboardingProgress
                        totalItems={onboardingContent.length}
                        pan={this.state.pan}
                    />
                    <OnboardingButtons
                        totalItems={onboardingContent.length}
                        currentIndex={this.state.currentIndex}
                        movePrevious={this.movePrevious}
                        moveNext={this.moveNext}
                        moveFinal={this.moveFinal}
                    />
                </CollapsibleView>
                <CollapsibleView
                    hide={!this.state.isDone}
                    style={styles.doneContainer}
                >
                    <AppText style={styles.doneText}>
                        Let 's read the news!
                    </AppText>
                </CollapsibleView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    panelContainer: {
        flex: 1,
        flexDirection: "row"
    },
    hidden: {
        flex: 0,
        width: 0
    },
    doneContainer: {
        overflow: "hidden",
        backgroundColor: ACCENT_COLORS[0],
        justifyContent: "center",
        alignItems: "center"
    },
    doneText: {
        fontSize: 20
    }
});

const mapDispatchToProps = dispatch => ({
    homeScreen: () =>
        dispatch(
            NavigationActions.navigate({
                routeName: "Home"
            })
        )
});

export default connect(null, mapDispatchToProps)(Onboarding);
