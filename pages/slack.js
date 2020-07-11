import Layout from '@components/Layout'
import siteConfig from '../siteconfig.json'
import styled from 'styled-components'
import { Box } from '@components/Box'
import { ButtonLink } from '@components/Button'

const GroupGrid = styled.div`
  display: grid;
  grid-column-gap: ${({ theme}) => theme.space[3]};
  grid-row-gap: ${({ theme}) => theme.space[3]};
  grid-template-columns: repeat(3, 1fr);
  @media screen and (max-width: ${({ theme }) => theme.breakpoints[4]}) {
    grid-template-columns: 1fr;
  }
`
const SlackGroup = styled.div`
  ${Box}
  padding-left: -${({ theme }) => theme.space[3]};
  padding-right: -${({ theme }) => theme.space[3]};
`

const Slack = ({ title, description, ...props }) => {

  const slackGroups = [
    {
      name: 'Tampa Bay Designers',
      description: 'Tampa Bay Designers is a collective of UX designers, illustrators, web designers, and more with the goal of sharing knowledge, feedback, and job opportunities.',
      link: siteConfig.slackSignUp,
      img: '/favicon/tbd.svg',
    }, {
      name: 'Tampa Bay UX',
      description: 'The Tampa Bay User Experience Group is one of the largest volunteer led user experience professional organizations in south central Florida.',
      link: 'https://join.slack.com/t/tampabayux/shared_invite/zt-fn2ie4h2-89xqc9~oDdLNoQq3Ah7rnA',
      img: '/tampa-bay-ux.png',
    }, {
      name: 'Design St. Pete',
      description: 'This group is for anyone who is interested in the craft of design. Product managers, designers, developers, marketers, business analysts, and c-level executives are welcome.',
      link: 'https://join.slack.com/t/designstpete/shared_invite/zt-8gv4mxo4-MVynPysniGgZT5G3DlMEcg',
      img: '/design-st-pete.png',
    }
  ]

  const truncate = str => {
    return str.length > 74 ? str.substring(0, 74) + "..." : str;
  }

  return (
    <>
      <Layout pageTitle={`${title} | Slack`} description={description}>
       <div style={{
         textAlign: 'center'
       }}>
        <h1>Slack Communities</h1>
        <p>Discuss trends, give advice, share feedback, look for new opportunities, and connect in-person inside one of the local Slack communities.</p>
        <h4>Find a community from the list below:</h4>
       </div>
       <GroupGrid>
         {
           slackGroups.map(group => (
            <SlackGroup
              title={group.description}
              key={group.name}
            >
              <img
                src={group.img}
                width="56"
                style={{
                  borderRadius: '50%'
                }}
              />
              <h4 style={{
                marginTop: '16px',
                marginBottom: '8px'
              }}>
                {group.name}
              </h4>
              <p
                title={group.description}
                style={{
                  color: 'var(--gray600)',
                  lineHeight: '1.2',
                  marginTop: '0'
                }}
              >
                <small>
                  {truncate(group.description)}
                </small>
              </p>
              <ButtonLink href={group.link}>
                Join Group
                <span className="arrow">
                <svg 
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 512 512'
                >
                  <polyline
                    points='268 112 412 256 268 400'
                    style={{
                      fill: 'none',
                      stroke: 'currentColor',
                      strokeLinecap: 'round',
                      strokeLinejoin: 'roune',
                      strokeWidth: '48px'
                    }}
                  />
                  <line
                    x1='392'
                    y1='256'
                    x2='100'
                    y2='256'
                    style={{
                      fill: 'none',
                      stroke: 'currentColor',
                      strokeLinecap: 'round',
                      strokeLinejoin: 'roune',
                      strokeWidth: '48px'
                    }}
                  />
                </svg>
                </span>
              </ButtonLink>
            </SlackGroup>
           ))
         }
       </GroupGrid>
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
