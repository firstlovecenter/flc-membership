#### 0.3.8 (2023-07-09)

##### New Features

*  switch from formik to react-hook-form ([aa176d50](https://github.com/jaedag/fl-admin-portal/commit/aa176d50d8d8c7448cdadeb4c61a3759dadc227d))
*  implement giving history page ([39fd2d7d](https://github.com/jaedag/fl-admin-portal/commit/39fd2d7df079a1f89667d5a280afcd6898bbf148))
*  implement transactions property on Member in schema ([b13f5c84](https://github.com/jaedag/fl-admin-portal/commit/b13f5c84b41f5969f3949849b0cfcc6f6e35b48e))
*   set firebase env from doppler secrets ([15657216](https://github.com/jaedag/fl-admin-portal/commit/15657216e51f3804dea5760074c32f991af8126a))

##### Bug Fixes

*  set null location to 0.0 for latlng ([fdaffd29](https://github.com/jaedag/fl-admin-portal/commit/fdaffd29e44f2c9d5394f53d7a5e462629fc772a))
*  implement page for giving history ([75cd0366](https://github.com/jaedag/fl-admin-portal/commit/75cd03667c2f7f115eb65366c05a63e1220c64ca))
*  log response from firestore transactions ([3199ae61](https://github.com/jaedag/fl-admin-portal/commit/3199ae61322d7762018a2fc5cbcfab8b0a0437f1))
*  update packages ([721d5bde](https://github.com/jaedag/fl-admin-portal/commit/721d5bdeceb32819f0243d7fbfbd007e52c6bf51))
*  fix bug in cypher not causing reference to get matched ([54d5cd30](https://github.com/jaedag/fl-admin-portal/commit/54d5cd30e067f32ec9c33a7c23fcd9bca4a278c6))
*  update deps ([ec03b7c3](https://github.com/jaedag/fl-admin-portal/commit/ec03b7c356fed4567ec91186736a01c171e4491d))
*  correct typing of confirmPayment Axios Body ([d4361238](https://github.com/jaedag/fl-admin-portal/commit/d4361238a985b4117094a250f02ef683da8f03e5))
*  fix undefined var in confirm transaction component ([b306523f](https://github.com/jaedag/fl-admin-portal/commit/b306523f7310fe44fe36b3988cb62ec8a3621bc6))
*  imporove charging and confirming flows ([c5e44978](https://github.com/jaedag/fl-admin-portal/commit/c5e44978df9c450aa4e452a68d1d60af60ae6a70))
*  update index.js ([829263f7](https://github.com/jaedag/fl-admin-portal/commit/829263f7582aa76f91b50cd12908b90859784530))
*  remove ApolloWrapper around the whole app ([796a880e](https://github.com/jaedag/fl-admin-portal/commit/796a880ed904f9fa106600561fbd076012485c5f))

##### Other Changes

* //github.com/firstlovecenter/flc-membership into deploy ([6d74bdac](https://github.com/jaedag/fl-admin-portal/commit/6d74bdac78b650f083cc22f22b303c3c8123e252))

#### 0.3.7 (2023-06-16)

##### New Features

*  implement offering details screen ([4f414c96](https://github.com/jaedag/fl-admin-portal/commit/4f414c96d62ed61924ed6889bf5c3de40370c85c))
*  implement confirm transaction on mobile money offerings ([b230b26e](https://github.com/jaedag/fl-admin-portal/commit/b230b26e8d818ee52848d7181f1fce3fb74471a2))
*  implement confirm Trasaction page ([90bfd67f](https://github.com/jaedag/fl-admin-portal/commit/90bfd67f434cd937f5023b7be11b54728ebd7bf0))
*  implement writing to firebase as well as neo4j on transaction init ([c83578a2](https://github.com/jaedag/fl-admin-portal/commit/c83578a2751bc4bfaf39fb0fb2545d8530a239fe))
*  implement feature to pay offering using momo ([3bbe02e7](https://github.com/jaedag/fl-admin-portal/commit/3bbe02e7b05c1807ed047c209f99a6716852e8f1))

##### Bug Fixes

*  update packages ([69b5b04d](https://github.com/jaedag/fl-admin-portal/commit/69b5b04dc815ef3ecb029023ec7431a8e4a01248))
*  implement getSecrets file in api ([d9800e40](https://github.com/jaedag/fl-admin-portal/commit/d9800e40937dfb941e8a73aa43dffd7ba9dd5ebd))
*  remove redundant build steps in netlify.toml ([b7dfabee](https://github.com/jaedag/fl-admin-portal/commit/b7dfabee0f7d7f0b6a3a1e55b77c9bc3258ccdb1))
*  change type of ProtectedRoute children ([924c7474](https://github.com/jaedag/fl-admin-portal/commit/924c74749c764e41e55d3bc7b67951b3bc2df67e))
*  disable eslint on private route ([a7c0be00](https://github.com/jaedag/fl-admin-portal/commit/a7c0be001be7b73c011752e4c6ec92e04476dfb6))
*  implement defaultProps for ProtectedRouteProps ([41c76307](https://github.com/jaedag/fl-admin-portal/commit/41c7630795b71fecfcb7c7d98290f93e8e438aac))
*  upadte types for PrivateRoute component ([673d5af8](https://github.com/jaedag/fl-admin-portal/commit/673d5af8987da3c17993f72783e17d8118600f71))
*  update types in payment resolvers' ([170cdb3f](https://github.com/jaedag/fl-admin-portal/commit/170cdb3f1d874a5c8e162a426f474570e20a72f5))
*  update packages ([70a02c05](https://github.com/jaedag/fl-admin-portal/commit/70a02c05f10d9e05c79ffecb291eedfd3501944f))
*  update npmrc file location ([6c63fdc9](https://github.com/jaedag/fl-admin-portal/commit/6c63fdc9f613ba2e77e9a755c3ee71be824b35ec))
*  update netlify settings  with doppler config ([e1013995](https://github.com/jaedag/fl-admin-portal/commit/e101399525ecd4f59dccc1ec02c4a62cc4e3d1c6))
*  implement feature for anon giving ([6d609b80](https://github.com/jaedag/fl-admin-portal/commit/6d609b80cff3c0a36098d87b7ba1a09ae1139bb8))
*  update netlify.toml build scripts ([e1d22e56](https://github.com/jaedag/fl-admin-portal/commit/e1d22e56b0e568d9113cb789ebb6c215f2b840ad))
*  implement anonymous signin ([b5c11e7b](https://github.com/jaedag/fl-admin-portal/commit/b5c11e7b014d73bf6b6e24224daef5754860dfed))
*  udpate build command ' ([b34c0b34](https://github.com/jaedag/fl-admin-portal/commit/b34c0b34292bd99f2f89250f17db18d040ec26ac))
*  specify type of err ([15d2bf24](https://github.com/jaedag/fl-admin-portal/commit/15d2bf24472eb8f2736dc5404f36c7915681143f))
*  implmement onSubmit funciton for giving offering ([202c2ab6](https://github.com/jaedag/fl-admin-portal/commit/202c2ab616929ecac8ac8a837c26c44257530499))
*  update graphql function ([8b35559e](https://github.com/jaedag/fl-admin-portal/commit/8b35559e15edf18a9d323b5cae711aab826d08a8))
*  update netlify build command ([34bb16a6](https://github.com/jaedag/fl-admin-portal/commit/34bb16a625a4efadc162f33251da6de0abaccfd1))
*   bugs breaking the build ([3da6d12e](https://github.com/jaedag/fl-admin-portal/commit/3da6d12edb876faba91971f0987538227ffd4751))

#### 0.3.6 (2023-05-19)

##### New Features

*  change authentication from firebase to auth0 ([802ecbd4](https://github.com/jaedag/fl-admin-portal/commit/802ecbd41a9d7cafe302cf15cf5edf868e6b7e7b))
*  implement apollo provider for firebase ([a3d7621d](https://github.com/jaedag/fl-admin-portal/commit/a3d7621d59ae7c7ed7b6ac00c8b089f09aee0de5))
*  implement frontend for give offering ([1ab3e36b](https://github.com/jaedag/fl-admin-portal/commit/1ab3e36bb581ca5b30e89f7c13d555beb9b93df6))
*  implement login and signup flow ([1ca4e931](https://github.com/jaedag/fl-admin-portal/commit/1ca4e9311468be915f2aac7fc7e163ac636bd7c2))
*  scaffold initial landing page ([78e0b27a](https://github.com/jaedag/fl-admin-portal/commit/78e0b27a2f44fdc6cb6bfb4f069e1d2c57d6b5f8))
*  switch from webpack to vite with chakra ui ([4197c479](https://github.com/jaedag/fl-admin-portal/commit/4197c479cd28566e2739b411382c763840065c88))

##### Bug Fixes

*  update build command ([2d080fd0](https://github.com/jaedag/fl-admin-portal/commit/2d080fd065a4b7381c08be755015b5fe8b0ede6b))
*  return more data on currentUser from db ([bfb1460f](https://github.com/jaedag/fl-admin-portal/commit/bfb1460f608dfd71a99b8a8f681f7ffa44cc9d73))
*  correct frontend build folder to publish to dist ([cf0145bb](https://github.com/jaedag/fl-admin-portal/commit/cf0145bb119e548ee791ca7991e94a3c31dc1a4c))

