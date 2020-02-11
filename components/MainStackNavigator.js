import {
	createAppContainer
} from 'react-navigation';
import {
	createStackNavigator
} from 'react-navigation-stack';
import Display from './Display';
import B from './B'

const mainnav=createStackNavigator({
    First:{screen:B,
    navigationOptions:{
        header:null,
    },
    },
    Display:{screen:Display}
})

const MainStack = createAppContainer(mainnav);

export default MainStack;