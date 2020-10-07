import React from 'react'
import styled from '@emotion/styled'
import { IconLinkedin } from '../icons/SelectIcon'

const Wrapper = styled.footer`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: flex-start;
  margin: 0 auto;
  max-width: ${(props) => props.theme.sizes.maxWidth};
`

const List = styled.ul`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  border-top: 1px solid ${(props) => props.theme.colors.secondary};
  padding: 1em 0 2em;
  margin: 0 1.5em;
`

const Item = styled.li`
  display: inline-block;
  padding: 0.25em 0;
  width: 100%;
  @media screen and (min-width: ${(props) => props.theme.responsive.small}) {
    width: auto;
  }
  a {
    font-weight: 600;
    transition: all 0.2s;
    color: ${(props) => props.theme.colors.text};
    &:hover {
      color: ${(props) => props.theme.colors.highlight};
    }
    &:visited {
      color: ${(props) => props.theme.colors.text};
    }
  }
`

const Footer = () => (
  <Wrapper>
    <List>
      <Item>© All rights reserved.</Item>
      <Item>
        <span>Developed by</span>{' '}
        <a href="https://heyayush.com/" target="_blank" rel="noopener noreferrer">
          @heyayush
        </a>{' '}
        <a
          href="https://www.linkedin.com/in/hey-ayush/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ margin: '0 4px' }}
        >
          <IconLinkedin />
        </a>
      </Item>
    </List>
  </Wrapper>
)

export default Footer
