// function Community() {
//   return <div className="nothing">Community</div>;
// }
// export default Community;

export default function Community() {
  return (
    <div className="nothing" style={{ textAlign: "center" }}>
      <h5 className="text-3xl font-bold mb-6">Community</h5>
      <p className="mb-4 text-lg">
        Welcome to the <strong>PII Detection App Community</strong>! Here,
        users, developers, and data privacy enthusiasts come together to share
        knowledge, exchange experiences, and improve the way we handle sensitive
        information.
      </p>

      <h5 className="text-2xl font-semibold mt-6 mb-2">What You Can Do</h5>
      <ul className="list-disc list-inside space-y-2 mb-4">
        <li>
          💬 <strong>Ask Questions:</strong> Post your questions and get help
          from other users and developers.
        </li>
        <li>
          📝 <strong>Share Feedback:</strong> Suggest new features,
          improvements, or optimizations.
        </li>
        <li>
          📢 <strong>Report Issues:</strong> Help us fix bugs and make the app
          more stable.
        </li>
        <li>
          📚 <strong>Learn Together:</strong> Discover tutorials, guides, and
          best practices in data protection.
        </li>
        <li>
          🌍 <strong>Collaborate:</strong> Join discussions about AI, privacy
          laws, and compliance strategies.
        </li>
      </ul>

      <h5 className="text-2xl font-semibold mt-6 mb-2">Our Mission</h5>
      <p>
        We believe in building a safe and collaborative environment where users
        can support each other and grow together. The community is a space to
        encourage ethical data handling and promote awareness about the
        importance of protecting personal information.
      </p>

      <h5 className="text-2xl font-semibold mt-6 mb-2">Get Involved</h5>
      <p>
        Join us today by signing in and becoming an active member. Together, we
        can make data privacy accessible and understandable for everyone.
      </p>
    </div>
  );
}
