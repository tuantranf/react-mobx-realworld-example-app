import MainView from './MainView'
import Chatbox from './Chatbox'
import Banner from './Banner'

import React from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'

@inject('commonStore')
@withRouter
@observer
export default class LandingPage extends React.Component {
  componentDidMount() {
    // this.props.commonStore.loadTags()
  }

  render() {
    const { tags, token, appName } = this.props.commonStore
    return (
      <div className="home-page">
        <Banner token={token} appName={appName} />
        <div className="container page">
          <div className="row">
            <MainView />

            <div className="col-md-3">
              <div className="sidebar">
                <p>Chatbox</p>

                <Chatbox tags={tags} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
