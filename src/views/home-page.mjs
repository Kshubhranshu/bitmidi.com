import { h } from 'preact' /** @jsx h */

import { doMidiAll } from '../actions/midi'

import Heading from './heading'
import Loader from './loader'
import Midi from './midi'
import PageComponent from './page-component'
import Pagination from './pagination'

export default class HomePage extends PageComponent {
  load () {
    const { store, dispatch } = this.context
    const { page } = store.location.query

    dispatch(doMidiAll({ page }))

    const title = ['Popular MIDIs']
    if (page !== '0') title.unshift(`Page ${page}`)

    dispatch('APP_META', { title, description: null })
  }

  render (props) {
    const { store } = this.context
    const { data, views } = store
    const { page } = store.location.query

    const midiSlugs = views.all[page]
    const midis = midiSlugs
      ? midiSlugs.map(midiSlug => data.midis[midiSlug])
      : []

    return (
      <div>
        <Heading class='tc'>Popular MIDIs</Heading>
        <Loader show={!midiSlugs} center>
          {midis.map(midi => <Midi midi={midi} />)}
        </Loader>
        <Pagination
          page={page}
          pageTotal={views.all.pageTotal}
          total={views.all.total}
        />
      </div>
    )
  }
}
