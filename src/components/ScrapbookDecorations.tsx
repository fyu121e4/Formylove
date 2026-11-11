const pieces = [
  { name: 'tulip-bouquet', position: 'bouquet' },
  { name: 'ribbon', position: 'ribbon' },
  { name: 'memory-ticket', position: 'ticket' },
  { name: 'love-envelope', position: 'envelope' },
  { name: 'red-heart', position: 'heart' },
]

export default function ScrapbookDecorations() {
  return (
    <div className="scrapbook-decorations" aria-hidden="true">
      {pieces.map(({ name, position }) => (
        <img
          key={name}
          src={import.meta.env.BASE_URL + 'decorations/' + name + '.png'}
          alt=""
          draggable={false}
          className={'scrapbook-piece scrapbook-' + position}
        />
      ))}
    </div>
  )
}
