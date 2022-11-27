const blogs = Array.from({ length: 5 }).map((_, i) => ({
  title: `Blog ${i}`,
  description: `Blog Description ${i}`,
  content: `Blog Content ${i}`,
  image: `https://picsum.photos/200/300?random=${i}`,
  author: "Vaibhav Agarwal",
  tags: ["tag1", "tag2", "tag3"],
  isPublished: true,
  isArchived: false,
  isDraft: false,
  likes: 0,
}));

module.exports = { blogs };