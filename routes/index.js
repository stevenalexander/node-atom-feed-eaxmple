const express = require('express')
const router = express.Router()
const Feed = require('feed')

router.get('/', function (req, res, next) {
  let feed = new Feed({
    title: 'Feed Title',
    description: 'This is my personal feed!',
    id: 'http://example.com/',
    link: 'http://example.com/',
    image: 'http://example.com/image.png',
    favicon: 'http://example.com/favicon.ico',
    copyright: 'All rights reserved 2013, John Doe',
    updated: new Date(2018, 2, 10), // optional, default = today
    generator: 'awesome', // optional, default = 'Feed for Node.js'
    feedLinks: {
      json: 'https://example.com/json',
      atom: 'https://example.com/atom'
    },
    author: {
      name: 'John Doe',
      email: 'johndoe@example.com',
      link: 'https://example.com/johndoe'
    }
  })

  let posts = [{
    title: 'Post 1',
    url: 'http://example.com/posts/1',
    description: 'This is post 1',
    content: 'Content for post 1',
    date: new Date(2018, 2, 1)
  },
  {
    title: 'Post 2',
    url: 'http://example.com/posts/2',
    description: 'This is post 2',
    content: 'Content for post 2',
    date: new Date(2018, 2, 2)
  },
  {
    title: 'Post 3',
    url: 'http://example.com/posts/3',
    description: 'This is post 3',
    content: 'Content for post 3',
    date: new Date(2018, 2, 3)
  }]

  posts.forEach(post => {
    feed.addItem({
      title: post.title,
      id: post.url,
      link: post.url,
      description: post.description,
      content: post.content,
      author: [{
        name: 'Jane Doe',
        email: 'janedoe@example.com',
        link: 'https://example.com/janedoe'
      }, {
        name: 'Joe Smith',
        email: 'joesmith@example.com',
        link: 'https://example.com/joesmith'
      }],
      contributor: [{
        name: 'Shawn Kemp',
        email: 'shawnkemp@example.com',
        link: 'https://example.com/shawnkemp'
      }, {
        name: 'Reggie Miller',
        email: 'reggiemiller@example.com',
        link: 'https://example.com/reggiemiller'
      }],
      date: post.date
    })
  })

  res.set('Content-Type', 'text/xml')
  res.send(feed.atom1())
})

module.exports = router
