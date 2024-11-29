import Provider from './theme-context'
import Total from './Total'
import Card from './Card'

export default function ChangeTheme() {
    return (
        <Provider>
            <Total />
            <Card />
            <Card />
            <Card />
        </Provider>
    )
}