import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

export default function RepoItem({repo}) {
  return (
    <div className='card'>
        <h3>
            <a href={repo.html_url}>{repo.name}</a>
        </h3>
    </div>
  )
}

RepoItem.propTypes = {
    repo: PropTypes.object.isRequired,
}