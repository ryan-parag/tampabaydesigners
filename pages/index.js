import Layout from '@components/Layout'
import Link from 'next/link'
import styled from 'styled-components'
import { BoxLink } from '@components/Box'

const GroupContent = styled.div`
  margin-top: ${({ theme }) => theme.space[3]};
  @media screen and (max-width: ${({ theme }) => theme.breakpoints[4]}) {
    margin-top: 0;
    padding-left: ${({ theme }) => theme.space[3]};
  }
`

const GroupGrid = styled.div`
  display: grid;
  grid-column-gap: ${({ theme}) => theme.space[3]};
  grid-row-gap: ${({ theme}) => theme.space[3]};
  grid-template-columns: repeat(3, 1fr);
  @media screen and (max-width: ${({ theme }) => theme.breakpoints[4]}) {
    grid-template-columns: 1fr;
  }
`

const Index = ({ title, description, ...props }) => {

  const groups = [
    {
      name: 'Tampa Bay UX',
      link: 'https://www.meetup.com/Tampabay-UX-Group/',
      img: '/tampa-bay-ux.png',
      description: 'The Tampa Bay User Experience Group is one of the largest volunteer led user experience professional organizations in south central Florida.'
    },{
      name: 'Design St. Pete',
      link: 'https://www.meetup.com/Design-St-Pete/',
      img: '/design-st-pete.png',
      description: 'This group is for anyone who is interested in the craft of design. Product managers, designers, developers, marketers, business analysts, and c-level executives are welcome.'
    },{
      name: 'Dribbble Tampa',
      link: 'https://dribbble.com/places/tampa',
      img: '/dribbble-tampa.png',
      description: 'The official Dribbble community in Tampa: connect with other designers, swap art, win swag, and take part in an analog design challenge'
    },{
      name: 'Sketch Tampa',
      link: 'https://www.sketch.com/community/groups/tampa-bay/',
      img: '/sketch-tampa.png',
      description: 'This an official Sketch meetup for designers and developers in Tampa Bay. Join us to share knowledge, trade tips, and hear about new plugins and resources.'
    },{
      name: 'Figma Tampa',
      link: 'https://www.meetup.com/Figma-Tampa-Bay/',
      img: '/figma-tampa.png',
      description: 'This meetup is for all Figma users in the Tampa Bay Area! Learn, share and connect with your fellow Figmanites!'
    },
  ]

  const truncate = str => {
    return str.length > 74 ? str.substring(0, 74) + "..." : str;
  }

  return (
    <>
      <Layout pageTitle={title} description={description}>
        <h1>Welcome!</h1>
        <p>🆕 New to the Tampa design community?</p>
        <p>{description}</p>
        <ul>
          <li>
            <Link href="/slack">Join a few of the Slack communities</Link>
          </li>
          <li>
          <Link href="/meetups">Attend an upcoming event</Link>
          </li>
        </ul>
        <h3>Our local design communities:</h3>
        <GroupGrid>
          {
            groups.map(group => (
              <BoxLink href={group.link} target="_blank" key={group.name}>
                <img src={group.img} width="64"/>
                <GroupContent>
                  <h3 style={{
                    marginBottom: '0',
                    marginTop: '0'
                  }}>
                    {group.name}
                  </h3>
                  <p
                    title={group.description}
                    style={{
                      marginBottom: '0',
                      lineHeight: '1.2',
                      color: 'var(--gray600)'
                    }}
                  >
                    <small>
                      {truncate(group.description)}
                    </small>
                  </p>
                </GroupContent>
              </BoxLink>
            ))
          }
        </GroupGrid>
        <p>
          Don't see your group listed?{' '}
          <a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSddTfmh1Gn4U-olwwrVgkFyV8YQakBmouImmhASQcoACqUeZQ/viewform?usp=sf_link">Fill out the form</a>
        </p>
      </Layout>
    </>
  )
}

export default Index

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`)

  return {
    props: {
      title: configData.default.title,
      description: configData.default.description,
    },
  }
}
