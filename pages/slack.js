import Layout from '@components/Layout'
import Link from 'next/link'
import siteConfig from '../siteconfig.json'
import styled from 'styled-components'

const SignUpButton = styled.a`
  display: inline-block;
  padding: ${({ theme}) => theme.space[2]} ${({ theme}) => theme.space[6]};
  background: var(--orange);
  color: var(--white);
  border-radius: ${({ theme}) => theme.space[2]};
  font-size: ${({ theme}) => theme.fontSizes[4]};
  text-decoration: none;
  box-shadow: inset 0px 0px ${({ theme}) => theme.space[1]} rgba(255,255,255,1);
  text-shadow: 0px 1px 2px rgba(0,0,0,.2);
  transition: all 120ms ease-out 0s;
  .arrow {
    margin-left:${({ theme}) => theme.space[2]};
    display: inline-block;
    transition: all 120ms ease-out 0s;
    opacity: .5;
  }
  :visited {
    color: var(--white);
  }
  &:hover, &:focus {
    background: var(--red);
    color: var(--white);
    .arrow {
      transform: translateX(${({ theme}) => theme.space[2]}) scale(1.1);
      opacity: 1;
    }
  }
  &:focus {
    box-shadow: inset 0px 0px 0px 2px var(--purple);
    outline: none;
  }
`

const Slack = ({ title, description, ...props }) => {
  return (
    <>
      <Layout pageTitle={`${title} | Slack`} description={description}>
       <div style={{
         textAlign: 'center'
       }}>
        <h1>Slack Community</h1>
        <p>Discuss trends, give advice, share feedback, uncover insights, surface opportunities, and connect in-person using the Tampa Bay Designers Slack community.</p>
        <SignUpButton href={siteConfig.slackSignUp}>
          Join the Community!
          <span className="arrow">&rarr;</span>
        </SignUpButton>
       </div>
        <img
          src="../static/slack-example.png"
          style={{
            width: '100%',
            display: 'block',
            marginTop: '24px',
            borderRadius: '8px'
          }}
        />
        <h3>A few of the slack channels in the group:</h3>
        <ul>
          <li>#introductions</li>
          <li>#jobs</li>
          <li>#sketch</li>
          <li>#figma</li>
          <li>#dribbble</li>
          <li>#design-feedback</li>
          <li>#design-challenges</li>
          <li>#meetups</li>
        </ul>
        <p>
          Want to customize your Slack theme? <a href="https://slack-themes.now.sh/" target="_blank">Find one on Slack Themes!</a>
        </p>
      </Layout>
    </>
  )
}

export default Slack

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`)

  return {
    props: {
      title: configData.default.title,
      description: configData.default.description
    },
  }
}
