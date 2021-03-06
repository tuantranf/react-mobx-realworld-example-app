import ArticleList from 'components/ArticleList'
import React from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter, NavLink } from 'react-router-dom'
import { parse as qsParse } from 'query-string'

@inject('articlesStore', 'commonStore', 'userStore')
@withRouter
@observer
export default class MainView extends React.Component {
  componentWillMount() {
    this.props.articlesStore.setPredicate(this.getPredicate())
  }

  componentDidMount() {
    this.props.articlesStore.loadArticles()
  }

  componentDidUpdate(previousProps) {
    if (
      this.getTab(this.props) !== this.getTab(previousProps) ||
      this.getTag(this.props) !== this.getTag(previousProps)
    ) {
      this.props.articlesStore.setPredicate(this.getPredicate())
      this.props.articlesStore.loadArticles()
    }
  }

  getTag(props = this.props) {
    return qsParse(props.location.search).tag || ''
  }

  getTab(props = this.props) {
    return qsParse(props.location.search).tab || 'all'
  }

  getPredicate(props = this.props) {
    switch (this.getTab(props)) {
      case 'feed':
        return { myFeed: true }
      case 'tag':
        return { tag: qsParse(props.location.search).tag }
      default:
        return {}
    }
  }

  handleTabChange = (tab) => {
    if (this.props.location.query.tab === tab) return
    this.props.router.push({ ...this.props.location, query: { tab } })
  }

  handleSetPage = (page) => {
    this.props.articlesStore.setPage(page)
    this.props.articlesStore.loadArticles()
  }

  render() {
    const { currentUser } = this.props.userStore
    const {
      articles,
      isLoading,
      page,
      totalPagesCount,
    } = this.props.articlesStore

    return (
      <div className="col-md-9">
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    )
  }
}
