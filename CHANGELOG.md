#### 0.3.13 (2023-09-12)

#### 0.3.12 (2023-09-12)

#### 0.3.11 (2023-09-12)

#### 0.3.10 (2023-09-12)

##### New Features

*  complete member profile page ([46fe8371](https://github.com/jaedag/fl-admin-portal/commit/46fe8371f05bea3757efc64cf76c22a161f31a34))
*  implement profile display page ([4eb68d59](https://github.com/jaedag/fl-admin-portal/commit/4eb68d59352b19976dfbb2371b1ba70e0a8e1071))

##### Bug Fixes

*  no more manual location setting ([c43302c0](https://github.com/jaedag/fl-admin-portal/commit/c43302c0a5bc9455958429909d891310fa14cc35))
*  fix entering of 0.0 for location data ([7cdccecc](https://github.com/jaedag/fl-admin-portal/commit/7cdccecccc8beac9616584d00a01f793c1cefbf1))
*  finish implementation of uploading member locations for visitation ([c964822b](https://github.com/jaedag/fl-admin-portal/commit/c964822bf506036c29862eaa65ea1209f8bc9522))
*  introduce a frontend form for updating locations ([9ca052bd](https://github.com/jaedag/fl-admin-portal/commit/9ca052bdb0914dc0f5cd9274684cf1c778bace5e))
*  remove unneeded console.log ([3d75fcf6](https://github.com/jaedag/fl-admin-portal/commit/3d75fcf6c80e156a8405b753072ce9e8ae1c7268))
*  implement notify functions in api ([8cb185e4](https://github.com/jaedag/fl-admin-portal/commit/8cb185e4736a2ada1cbc1089b2f9e2480b2013ee))
*   add an edit button ([7cc2cba1](https://github.com/jaedag/fl-admin-portal/commit/7cc2cba1bd80572959d407e492ecfc4348bebb90))
*  fix typo on offering details page ([d3044e14](https://github.com/jaedag/fl-admin-portal/commit/d3044e14a9fe2e04e1acb0464fc23445fc61b522))
*  fix bug  breaking frontend after confirm transaction ([4a3c7938](https://github.com/jaedag/fl-admin-portal/commit/4a3c79388434cdfc556af7f37b4584809698641d))
*  update validation for flc-membership ([4aae0748](https://github.com/jaedag/fl-admin-portal/commit/4aae07482194751118edd9765c07d11dfda2cdd3))
*  update initial Value for offering form ([704d99ec](https://github.com/jaedag/fl-admin-portal/commit/704d99ec469a6d1f3cbb1497bc9ddfbc736a20e5))

#### 0.3.9 (2023-07-31)

##### Bug Fixes

*  add fellowship code input message for offering form ([7c8cad19](https://github.com/jaedag/fl-admin-portal/commit/7c8cad199cedc8e018bd6c653de0ff6abcc318da))
*  mutation to createProfile now returns data correctly ([a5a541c6](https://github.com/jaedag/fl-admin-portal/commit/a5a541c624fa026e22c247f74ee3d8499120f184))
*  minor changes ([9ea6ed16](https://github.com/jaedag/fl-admin-portal/commit/9ea6ed16b17754c04632f5e495c5bf3842a1d6b0))
*  update create profile mutation ([07c84e8f](https://github.com/jaedag/fl-admin-portal/commit/07c84e8fb383fedcf5e73e5430ba76b511dd6031))
*  add apollo.config file for apollo vscode ext ([1fb0bfe0](https://github.com/jaedag/fl-admin-portal/commit/1fb0bfe0af420b7cc8fe98ee2c337220c401fde9))
*  order member  transactions by createdAt date ([9c49d98f](https://github.com/jaedag/fl-admin-portal/commit/9c49d98f9176c9149a8f243ff469248e93809a49))
*  change 'fellowship' to 'fellowshipCode' in UpdateProfile.tsx ([aec4355a](https://github.com/jaedag/fl-admin-portal/commit/aec4355a1fefa7268df2cb2608f22be651a4c27a))
*  fix bugs when submitting offerigs ([86c61e34](https://github.com/jaedag/fl-admin-portal/commit/86c61e3485b57da37af895f0f78b1b275de99e83))
*  correct using memberRef in firestore ([4c9c8f6c](https://github.com/jaedag/fl-admin-portal/commit/4c9c8f6c86435d9048554bdc044b792cd5ef49b3))
*  update resolvers for creating member profile ([da26639e](https://github.com/jaedag/fl-admin-portal/commit/da26639ef3d5fb86607882cab6949c8e9ce6de4f))
*  update styling on fellowshipCodeInputMessage ([6b79973a](https://github.com/jaedag/fl-admin-portal/commit/6b79973abf56c1e491bf34a26aaa84f51109b83e))
*  create fellowship name popup on entering bankingCode ([c4768bda](https://github.com/jaedag/fl-admin-portal/commit/c4768bda112f43033988007bc6c057f0716c0972))
*  update backend code for viewing transactions ([af98d39b](https://github.com/jaedag/fl-admin-portal/commit/af98d39b9f6dad8e3c6980d28f922e27e8e19048))
*  update transactions to use memberRef object ([7514daae](https://github.com/jaedag/fl-admin-portal/commit/7514daae0684310562b7d98c45f9df5ce57cc2da))
*  remove anonymous flow, make createdBy reference ([0d9f8feb](https://github.com/jaedag/fl-admin-portal/commit/0d9f8feb20f244dca067981f9e3c84b4e2a09b62))
*  when a person with no account signs in, it gives him  a createProfile page ([8a23e3d7](https://github.com/jaedag/fl-admin-portal/commit/8a23e3d7ace27c55b0616983a836382c60c067e8))
*  fix import of ConfirmTransaction component ([f6ceb9bb](https://github.com/jaedag/fl-admin-portal/commit/f6ceb9bb6dcbc423690be8b5ec3f4cd50d26a502))
*  implement better handling of splash screen scenario ([5bb4c3b8](https://github.com/jaedag/fl-admin-portal/commit/5bb4c3b8e1bcd68e427f88730b02229b383147fd))
*  implement an update profile page for members to update their profile information ([8055fb69](https://github.com/jaedag/fl-admin-portal/commit/8055fb698dfe207b9d1929d1c7f8c5020cab49aa))
*  solve problem with login page not showing on unauthenticated sessions ([525cdf99](https://github.com/jaedag/fl-admin-portal/commit/525cdf99bd1ece2d3885f303b64131b3dfb91298))
*  remove anonymous flow in favour of google signin ([bc849f93](https://github.com/jaedag/fl-admin-portal/commit/bc849f934fed8a40ef397d9e57c8ec0e7ad007ab))
*  add a placeholder constant ([605b6a68](https://github.com/jaedag/fl-admin-portal/commit/605b6a686004c5467c6ab777873beec8af51e6df))
*  implement anon giving resolver ([852aebfd](https://github.com/jaedag/fl-admin-portal/commit/852aebfdfab6df33d82449986678ce1a9c13f0ec))
*  udpate frontend dependencies ([d4fd4156](https://github.com/jaedag/fl-admin-portal/commit/d4fd4156b7eeb1453ae0a152b0cd8fd234312514))
*  optional chaining on optional properties ([734d369b](https://github.com/jaedag/fl-admin-portal/commit/734d369ba0d12f76a1d37d5daa71965b15df731d))
*  add hasHolyGhostBaptismDate to member type ([219f4745](https://github.com/jaedag/fl-admin-portal/commit/219f4745fc8a2ffc899763660443361e195d6238))
*  set createdBy as a reference instead of a regular string ([1cfd3d6f](https://github.com/jaedag/fl-admin-portal/commit/1cfd3d6fb92e9ac6144fe9af450c403be31a0323))
*  create page for member sign up ([dd234884](https://github.com/jaedag/fl-admin-portal/commit/dd2348841ac4331f919cc7bbaf27df757af8063b))
*  correct import of humanReadableDate ([cbeff3aa](https://github.com/jaedag/fl-admin-portal/commit/cbeff3aac48b5f91084fa39a1e4340aed3c1ad1d))

##### Refactors

*  lowercase all  mutation names ([b2c530cc](https://github.com/jaedag/fl-admin-portal/commit/b2c530ccdfb566bf540db6d1d54d97da74950f1c))

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

