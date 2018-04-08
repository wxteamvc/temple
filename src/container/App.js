
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Animated,
    Easing,
    StatusBar,

} from 'react-native';
import { connect } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import { ScreenWidth, ScreenHeight, StatusBarHeight, fontSizeScaler, styleColor, log, toMinute } from '../constants/global'
import NavigationService from './NavigationService';
import SuspensionPlayBotton from '../components/suspensionPlayBotton';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
import HomeTab from './HomeTab';
import AlbumInfo from '../pages/Details/AlbumInfoView';
import Login from '../pages/Personal/LoginView';
import Register from '../pages/Personal/RegisterView';
import Authentication from '../pages/Personal/AuthenticationView';
import CompanyAuthentication from '../pages/Personal/CompanyAuthenticationView';
import PersonalAuthentication from '../pages/Personal/PersonalAuthenticationView';
import Question from '../pages/Details/QuestionView';
import Article from '../pages/Details/ArticleView';
import QuestionList from '../pages/List/QuestionListView';
import CreatQuestion from '../pages/Details/CreateQuestionView';
import ChildrenAnswer from '../pages/Details/ChildrenAnswerView';
import PlayScene from '../pages/Details/PlaySceneView';
import VideoPlay from '../pages/Details/VideoPlayView';


const MyApp = StackNavigator(
    {
        VideoPlay: {
            screen: VideoPlay,
            navigationOptions: ({ navigation }) => {
                return ({
                    header: null
                })
            }
        },

        HomeTab: {
            screen: HomeTab,
            navigationOptions: ({ navigation }) => {
                return ({
                    header: null
                })
            }
        },

        PlayScene: {
            screen: PlayScene,
            navigationOptions: ({ navigation }) => {
                return ({
                    header: null
                })
            }
        },
        ChildrenAnswer: {
            screen: ChildrenAnswer,
            navigationOptions: ({ navigation }) => {
                return ({
                    header: null
                })
            }
        },
        CreatQuestion: {
            screen: CreatQuestion,
            navigationOptions: ({ navigation }) => {
                return ({
                    header: null
                })
            }
        },
        QuestionList: {
            screen: QuestionList,
            navigationOptions: ({ navigation }) => {
                return ({
                    header: null
                })
            }
        },
        AlbumInfo: {
            screen: AlbumInfo,
            navigationOptions: ({ navigation }) => {
                return ({
                    header: null
                })
            }
        },
        Login: {
            screen: Login,
            navigationOptions: ({ navigation }) => {
                return ({
                    header: null
                })
            }
        },
        Register: {
            screen: Register,
            navigationOptions: ({ navigation }) => {
                return ({
                    header: null
                })
            }
        },
        Authentication: {
            screen: Authentication,
            navigationOptions: ({ navigation }) => {
                return ({
                    header: null
                })
            }
        },
        CompanyAuthentication: {
            screen: CompanyAuthentication,
            navigationOptions: ({ navigation }) => {
                return ({
                    header: null
                })
            }
        },
        PersonalAuthentication: {
            screen: PersonalAuthentication,
            navigationOptions: ({ navigation }) => {
                return ({
                    header: null
                })
            }
        },
        Question: {
            screen: Question,
            navigationOptions: ({ navigation }) => {
                return ({
                    header: null
                })
            }
        },
        Article: {
            screen: Article,
            navigationOptions: ({ navigation }) => {
                return ({
                    header: null
                })
            }
        },
    },
    {
        transitionConfig: () => ({
            screenInterpolator: CardStackStyleInterpolator.forHorizontal,
            transitionSpec: {
                duration: 250,
                easing: Easing.ease,
                timing: Animated.timing,
            },
        }),
    }
)


class App extends Component {

    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar
                    backgroundColor={styleColor}
                    translucent={false}
                />
                <MyApp
                    ref={navigatorRef => {
                        NavigationService.setTopLevelNavigator(navigatorRef);
                    }} />
                {this.props.playReducer.showBtn && this.props.playReducer.resources_list.length > 0 ?
                    <SuspensionPlayBotton /> : null
                }

            </View>
        )
    }

}

function mapStateToProps(state) {
    return {
        playReducer: state.playReducer
    }
}
export default connect(mapStateToProps)(App);