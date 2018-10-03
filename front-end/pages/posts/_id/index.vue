<template>
  <div class="single-post-page">
    <section class="post">
      <h1 class="post-title">{{ loadedPost.title }}</h1>
      <div class="post-details">
        <div class="post-detail">Last updated on {{ loadedPost.updatedDate }}</div>
        <div class="post-detail">Written by {{ loadedPost.author }}</div>
      </div>
      <p class="post-content">{{ loadedPost.content }}</p>
    </section>
    <section class="post-feedback">
      <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium </p>
    </section>
  </div>
</template>

<script>
export default {
  middleware: 'guest',
  asyncData(context, callback) {
  console.log(context.req);
    setTimeout(() => {
      callback(null, {
        loadedPost: {
          id: "1",
          title: "First Post (ID: " + context.route.params.id + ")",
          previewText: "This is our first post!",
          author: 'Thien NB',
          updatedDate: new Date(),
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
          thumbnail:
            "https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg"
        }
      });
    }, 1000);
  }
};
</script>


