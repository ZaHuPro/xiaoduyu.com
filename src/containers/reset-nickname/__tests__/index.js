import React from 'react'
import { shallow, mount, render } from 'enzyme'
// https://github.com/airbnb/enzyme/issues/341
import 'jsdom-global/register'
import { Provider } from 'react-redux'
import { bindActionCreators } from 'redux'

import configureStore from '../../../store/configureStore'
import testConfig from '../../../../config/test'

import ResetNickname from '../index'

import { signin } from '../../../actions/sign'
import { loadUserInfo } from '../../../actions/user'

describe('<ResetNickname />', ()=>{

  const store = configureStore()
  const { dispatch } = store

  let props = {
  }

  const contextTypes = {
    context: {
      router: {
        goBack:()=>{},
        go:()=>{}
      }
    },
    childContextTypes: {
      router: ()=>{}
    }
  }

  let wrapper = null
  let me = null

  it('应该可以正常登录', ()=>{
    const action = bindActionCreators(signin, dispatch)
    return action({ email: testConfig.email, password: testConfig.password }, (res, result)=>{
      expect(result.success).toEqual(true)
    })
  })

  it('应该可以获取到用户的信息', function() {
    const action = bindActionCreators(loadUserInfo, dispatch)
    return action({
      callback: (result)=> {
        me = result.data
        expect(result.success).toEqual(true)
      }
    })
  })

  it('应该有 昵称输入框', function() {
    wrapper = mount(<Provider store={store}><ResetNickname {...props} /></Provider>, contextTypes)
    expect(wrapper.contains(<input type="text" defaultValue={me.nickname} ref="nickname"></input>))
    .toBe(true);
  })

})
