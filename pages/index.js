import Layout from '@components/Layout'
import getPosts from '@utils/getPosts'
import Link from 'next/link'
import styled from 'styled-components'

const GroupContainer = styled.a`
  padding: ${({ theme }) => theme.space[4]};
  display: flex;
  border-radius: ${({ theme }) => theme.space[2]};
  flex-direction: column;
  align-items: center;
  background: var(--gray100);
  border: 1px solid var(--gray300);
  text-align: center;
  color: inherit;
  text-decoration: none;
  transition: all 120ms ease-out 0s;
  &:visited {
    color: inherit;
  }
  &:hover, &:focus {
    background: var(--gray200);
    border-color: var(--gray400);
    outline: none;
    color: inherit;
  }
  &:focus {
    border-color: var(--orange);
  }
  &:active {
    border-color: var(--gray400);
    color: var(--gray700);
    box-shadow: inset 0px 0px ${({ theme }) => theme.space[3]} var(--gray400);
  }
`

const GroupGrid = styled.div`
  display: grid;
  grid-column-gap: ${({ theme}) => theme.space[3]};
  grid-row-gap: ${({ theme}) => theme.space[3]};
  grid-template-columns: repeat(3, 1fr);
`

const Index = ({ posts, title, description, ...props }) => {

  const groups = [
    {
      name: 'Tampa Bay UX',
      link: '',
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
            <Link href="/slack">Join the Slack community</Link>
          </li>
          <li>
          <Link href="/meetups">Find an upcoming event</Link>
          </li>
        </ul>
        <h3>Our local design communities:</h3>
        <GroupGrid>
          {
            groups.map(group => (
              <GroupContainer href={group.link} target="_blank" key={group.name}>
                <img src={group.img} width="64"/>
                <h4 style={{
                  marginBottom: '0',
                  marginTop: '16px'
                }}>
                  {group.name}
                </h4>
                <p style={{
                  marginBottom: '0',
                  lineHeight: '1.2',
                  color: 'var(--gray600)'
                }}>
                  <small>
                    {truncate(group.description)}
                  </small>
                </p>
              </GroupContainer>
            ))
          }
        </GroupGrid>
      </Layout>
    </>
  )
}

export default Index

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`)

  const posts = ((context) => {
    return getPosts(context)
  })(require.context('../posts', true, /\.md$/))

  return {
    props: {
      posts,
      title: configData.default.title,
      description: configData.default.description,
    },
  }
}
