import React, {Component} from 'react';
import './App.css';

function BlogCard(props) {
    const ulStyle = {height: '250px', overflowY: 'auto'};
    const blog = props.blog;
    return (
        <div className="column col-4 col-md-6 col-xs-12 mt-2">
            <ul className="menu bg-gray">
                <li className="menu-item">
                    <div className="tile tile-centered">
                        <div className="tile-icon">
                            {
                                blog.feed.image 
                                    ? <img src={blog.feed.image} className="avatar app-avatar" alt=""/> 
                                    : <figure className="avatar" data-initial={blog.title.substring(0, 2)}></figure>
                            }
                        </div>
                        <div className="tile-content">
                            <a className="text-success" href={blog.home_page} target="_href" title={blog.home_page}>{blog.title}</a>
                        </div>
                        {blog.is_loading && <div className="loading"></div>}
                    </div>
                </li>
            </ul>
            <ul className="menu" style={ulStyle}>
                {
                    blog.items.map((item, idx) => {
                        return <li key={idx} className="menu-item item-hover">
                            <div className="tile tile-centered">
                                <div className="tile-icon">
                                    <div className="example-tile-icon">
                                        {
                                            item.thumbnail
                                                ? <img src={item.thumbnail} className="avatar app-avatar" alt=""/>
                                                : <figure className="avatar bg-secondary text-primary" data-initial={idx + 1}></figure>
                                        }
                                    </div>
                                </div>
                                <div className="tile-content">
                                    <a className="tile-title" target="_href" title={item.title}
                                       href={item.link}>{item.title}</a>
                                    <div className="tile-subtitle text-gray">Ngày đăng: {item.pubDate}</div>
                                </div>
                            </div>
                        </li>
                    })


                }

            </ul>
        </div>
    );
}

class App extends Component {
    state = {
        blogs: [
            {
                title: 'toidicodedao',
                home_page: 'https://toidicodedao.com',
                rss_url: 'https://toidicodedao.com/feed/',
                feed: {},
                is_loading: true,
                items: []
            },
            {
                title: 'codeaholicguy',
                home_page: 'https://codeaholicguy.com',
                rss_url: 'https://codeaholicguy.com/feed/',
                feed: {},
                is_loading: true,
                items: []
            },
            {
                title: 'viblo',
                home_page: 'https://viblo.asia',
                rss_url: 'https://viblo.asia/rss/',
                feed: {},
                is_loading: true,
                items: []
            },
            {
                title: 'techtalk',
                home_page: 'https://techtalk.vn/',
                rss_url: 'https://techtalk.vn/feed',
                feed: {},
                is_loading: true,
                items: []
            },
            {
                title: 'itviec',
                home_page: 'https://itviec.com/blog/',
                rss_url: 'https://itviec.com/blog/feed/',
                feed: {},
                is_loading: true,
                items: []
            },
            {
                title: 'topdev',
                home_page: 'https://blog.topdev.vn/',
                rss_url: 'https://blog.topdev.vn/feed/',
                feed: {},
                is_loading: true,
                items: []
            },
            {
                title: 'scotch',
                home_page: 'https://scotch.io',
                rss_url: 'https://scotch.io/feed/',
                feed: {},
                is_loading: true,
                items: []
            },
            {
                title: 'mkyong',
                home_page: 'http://www.mkyong.com',
                rss_url: 'http://www.mkyong.com/feed/',
                feed: {},
                is_loading: true,
                items: []
            },
            {
                title: 'baeldung',
                home_page: 'http://www.baeldung.com/',
                rss_url: 'http://feeds.feedburner.com/Baeldung',
                feed: {},
                is_loading: true,
                items: []
            }
        ]
    };

    componentDidMount() {
        this.state.blogs.forEach((blog, idx) => this.fetchRSS(blog, idx));
    }

    handleResponse(value, idx) {
        let blogs = this.state.blogs;
        blogs[idx].is_loading = false;
        blogs[idx].feed = value.feed;
        blogs[idx].items = value.items.map(item => ({
            title: item.title,
            pubDate: item.pubDate,
            link: item.link,
            thumbnail: item.thumbnail
        }));
        this.setState({blogs: blogs});
    }

    fetchRSS(item, idx) {
        fetch(`https://api.rss2json.com/v1/api.json?rss_url=${item.rss_url}`)
            .then(res => res.json())
            .then(json => {
                if (json.status === 'ok') {
                    this.handleResponse(json, idx);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        const {blogs} = this.state;

        return (
            <div className="App">
                <div className="container">

                    <div className="columns">
                        {
                            blogs.map((blog, idx) => <BlogCard key={idx} blog={blog}/>)
                        }
                    </div>

                </div>

            </div>
        );
    }
}

export default App;
