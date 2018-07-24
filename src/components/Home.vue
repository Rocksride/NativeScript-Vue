<template>
  <Page class="page">
    <ActionBar class="action-bar" title="Home"/>

         <Gradient direction="to bottom" colors="#304352, #d7d2cc">
            <StackLayout>
              <Button class="btn btn-primary" @tap="$router.push('/counter')">Counter</Button>
              <Button class="btn btn-primary" @tap="$router.push('/hello')">Hello World</Button>
              <Button class="btn btn-primary" @tap="$router.push('/image')">Image analyzer</Button>
            </StackLayout>
         </Gradient>
  </Page>
</template>
