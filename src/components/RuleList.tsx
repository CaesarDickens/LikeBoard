export function RuleList() {
  return (
    <section className="sticker-card card-gap">
      <h2 className="section-title">How It Works</h2>
      <ul className="rule-list">
        <li>Each wallet can like one specific postId only once.</li>
        <li>The like action is a real onchain Base transaction.</li>
        <li>Like counts are public and verifiable onchain.</li>
        <li>All app-sent transactions include ERC-8021 attribution data.</li>
      </ul>
    </section>
  );
}
