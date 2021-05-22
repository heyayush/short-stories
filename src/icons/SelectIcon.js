/* eslint-disable react/no-unknown-property */
import React from 'react'
import styled from '@emotion/styled'

const SVG = styled.svg`
  padding: 0;
  width: 0.6rem;
`

const SvgSocial = styled.svg`
  padding: 0;
  width: 1rem;
  vertical-align: middle;
`

const SelectIcon = () => {
  return (
    <SVG viewBox="0 0 292.362 292.362">
      <path
        d="M286.935,69.377c-3.614-3.617-7.898-5.424-12.848-5.424H18.274c-4.952,0-9.233,1.807-12.85,5.424
  C1.807,72.998,0,77.279,0,82.228c0,4.948,1.807,9.229,5.424,12.847l127.907,127.907c3.621,3.617,7.902,5.428,12.85,5.428
  s9.233-1.811,12.847-5.428L286.935,95.074c3.613-3.617,5.427-7.898,5.427-12.847C292.362,77.279,290.548,72.998,286.935,69.377z"
      />
    </SVG>
  )
}

const IconLinkedin = () => (
  <SvgSocial
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    fillRule="evenodd"
    clip-rule="evenodd"
    stroke-linejoin="round"
    stroke-miterlimit="1.414"
    fill="#0e76a8"
    role="img"
    aria-label="Linkedin"
  >
    <title>Linkedin</title>
    <path
      d="M13.632 13.635h-2.37V9.922c0-.886-.018-2.025-1.234-2.025-1.235 0-1.424.964-1.424 1.96v3.778h-2.37V6H8.51v1.04h.03c.318-.6 1.092-1.233 2.247-1.233 2.4 0 2.845 1.58 2.845 3.637v4.188zM3.558 4.955c-.762 0-1.376-.617-1.376-1.377 0-.758.614-1.375 1.376-1.375.76 0 1.376.617 1.376 1.375 0 .76-.617 1.377-1.376 1.377zm1.188 8.68H2.37V6h2.376v7.635zM14.816 0H1.18C.528 0 0 .516 0 1.153v13.694C0 15.484.528 16 1.18 16h13.635c.652 0 1.185-.516 1.185-1.153V1.153C16 .516 15.467 0 14.815 0z"
      fillRule="nonzero"
    />
  </SvgSocial>
)

export { SelectIcon, IconLinkedin }
