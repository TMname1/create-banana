// print BANANA in big money-se font using figlet
import figlet from 'figlet'

const printString = async (str) => {
  try {
    return await figlet.text(str, {
      font: 'Big Money-se',
      horizontalLayout: 'default',
      verticalLayout: 'default',
      width: 80,
      whitespaceBreak: true,
    })
  } catch (err) {
    console.log('Something went wrong...')
    console.dir(err)
  }
}

export default printString
