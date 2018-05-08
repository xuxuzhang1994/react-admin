import React, { Component } from 'react';
import { Layout, notification, Icon } from 'antd';
import './style/index.less';
import SiderCustom from './components/SiderCustom';
import HeaderCustom from './components/HeaderCustom';
import { receiveData } from './action';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Routes from './routes';
const { Content, Footer } = Layout;

class App extends Component {
    state = {
        collapsed: false,
    };
    componentWillMount() {
        const { receiveData } = this.props;
        const user = JSON.parse(localStorage.getItem('user'));
        user && receiveData(user, 'auth');
        // receiveData({a: 213}, 'auth');
        // fetchData({funcName: 'admin', stateName: 'auth'});
        this.getClientWidth();
        window.onresize = () => {
            console.log('屏幕变化了');
            this.getClientWidth();
            // console.log(document.body.clientWidth);
        }
    }
    componentDidMount() {
        const openNotification = () => {
            notification.open({
              message: '博主-yezihaohao',
              description: (
                  <div>
                      {/*<p>*/}
                          {/*GitHub地址： <a href="https://github.com/yezihaohao" target="_blank" rel="noopener noreferrer">https://github.com/yezihaohao</a>*/}
                      {/*</p>*/}
                      <p>
                          博客地址： <a href="https://xuxuzhang1994.github.io/" target="_blank" rel="noopener noreferrer">https://xuxuzhang1994.github.io/</a>
                      </p>
                  </div>
              ),
              icon: <Icon type="smile-circle" style={{ color: 'red' }} />,
              duration: 0,
            });
            localStorage.setItem('isFirst', JSON.stringify(true));
        };
        const isFirst = JSON.parse(localStorage.getItem('isFirst'));
        //!isFirst && openNotification();
    }
    getClientWidth = () => {    // 获取当前浏览器宽度并设置responsive管理响应式
        const { receiveData } = this.props;
        const clientWidth = document.body.clientWidth;
        console.log(clientWidth);
        receiveData({isMobile: clientWidth <= 992}, 'responsive');
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    render() {
        // console.log(this.props.auth);
        // console.log(this.props.responsive);
        const { auth, responsive } = this.props;
        return (
            <Layout>
                {!responsive.data.isMobile && <SiderCustom collapsed={this.state.collapsed} />}
                <Layout style={{flexDirection: 'column'}}>
                    <HeaderCustom toggle={this.toggle} collapsed={this.state.collapsed} user={auth.data || {}} />
                    <Content style={{ margin: '0 16px', overflow: 'initial' }}>
                        <Routes auth={auth} />
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                    Project-Admin ©2017 Created by xuxu_zhang09@163.com
                    </Footer>
                </Layout>
                
                {/* {
                    responsive.data.isMobile && (   // 手机端对滚动很慢的处理
                        <style>
                        {`
                            #root{
                                height: auto;
                            }
                        `}
                        </style>
                    )
                } */}
            </Layout>
        );
    }
}

const mapStateToProps = (state,ownProps) => {
    console.log(ownProps)
    const { auth = {data: {}}, responsive = {data: {}} } = state.httpData;
    return {auth, responsive};
};
const mapDispatchToProps = dispatch => ({
    receiveData: bindActionCreators(receiveData, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
//connect后面第二个括号是要添加prop的react组件，
// 第一个括号中的参数是用来改变该组件prop的方法，
// 第一个括号有两个参数，第一个参数是一个函数，返回一个对象，对象的键是该组件的prop属性，值是该prop的值,这个函数允许我们将 store 中的数据作为 props 绑定到组件上。
// 第二个参数也是一个函数，返回一个对象，对象的键同样是prop的属性名，值是一个redux的dispatch，当这个prop属性被用于触发时，dispatch会改变redux中state的值。
// 第二个参数它的功能是，将 action 作为props 绑定到 组件 上。
