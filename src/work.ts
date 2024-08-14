const query = `
  {
    listTopTokens(limit: 30, networkFilter: 1399811149, resolution: "60") {
      address
    }
  }
`;

fetch("https://graph.defined.fi/graphql", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "91551ac6bb8b80b415bfe43442a6eb7a351a8d1b", // Include if authentication is required
  },
  body: JSON.stringify({
    query: query,
  }),
})
  .then((response) => response.json())
  .then((data) => console.log(JSON.stringify(data)))
  .catch((error) => console.error("Error:", error));
