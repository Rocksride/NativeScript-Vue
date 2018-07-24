<template>
  
   <Page class="page">
    <ActionBar class="action-bar" title="Optical recogniction">
      <NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="$router.push('/home')"/>
    </ActionBar>
         <Gradient direction="to bottom" colors="red, tomato">
             <Progress :value="currentProgress" />
            <StackLayout class="hello-world">
              
              <Button class="btn btn-primary" @tap="pickFile" text="Select file"/>
             
              <Image :src='apple' />
              <ActivityIndicator :busy="isBusy"/>
              <ScrollView orientation="vertical">
                <TextView editable='true' class="h6" textWrap=true :text="txt"/>
              </ScrollView>
            </StackLayout>
         </Gradient>
  </Page>
</template>

<script>
// import WebWorker from 'nativescript-webworkers';
// require( 'nativescript-webworkers' );
// import { FingerprintAuth } from "nativescript-fingerprint-auth";
import * as imagepicker from "nativescript-imagepicker";
// import okrabyte from 'okrabyte';

export default {
  data: () => ({
    fingerStatus: '',
    // fingerAuth: new FingerprintAuth(),
    worker: new Worker('~/workers/imageProcessing.js'),
    isBusy: false,
    currentProgress: 0,
    txt: '...wait',
    apple: `~/images/NativeScript-Vue.png`
  }),
  created() {
    const vm = this;
    this.worker.onmessage = function({data}) {
      console.log(data);
      if (data.done === false) {
        if (data.percentage)
        vm.currentProgress = data.percentage;
      }
      else {   
        console.log(data);
        // if( data.txt)
        vm.isBusy = false;
        vm.currentProgress = 0;
        vm.txt = data.text
        // vm.worker.terminate();
      }
    }
    this.worker.onerror = function(err) {
        console.log(`An unhandled error occurred in worker: ${err.filename}, line: ${err.lineno} :`);
        console.log(err.message);
    }
    
  },
  methods: {
    // checkIsAvailable() {
    //   const vm = this;
    //   this.fingerAuth.available()
    //     .then(
    //         (result) => {
    //           console.log("doCheckAvailable result: " + JSON.stringify(result));
    //           vm.fingerStatus = 'status', "Biometric ID available? - " + (result.any ? (result.face ? "Face" : "Touch") : "NO");
    //         })
    //     .catch(err => {
    //       console.log("doCheckAvailable error: " + err);
    //       vm.fingerStatus = 'status', "Error: " + err;
    //     });
    // },
    // verifyUserFinger() {
    //  this.fingerAuth.verifyFingerprint(
    //     {
    //       message: 'Scan your finger', // optional
    //       authenticationValidityDuration: 10 // Android
    //     })
    //     .then(() => {
    //       alert({
    //         title: "Biometric ID / passcode OK",
    //         okButtonText: "Sweet"
    //       });
    //     })
    //     .catch(err => {
    //       alert({
    //         title: "Biometric ID NOT OK / canceled",
    //         message: JSON.stringify(err),
    //         okButtonText: "Mmkay"
    //       });
    //     });
    // },
    recogniseImage(url) {
      const vm = this;
      this.isBusy = true;
      this.worker.postMessage(url)
    },
    pickFile() {
      const vm = this;
      const context = imagepicker.create({
       mode: "single" // use "multiple" for multiple selection
      });
        context.authorize().then(function() {
              return context.present();
          }).then(function(selection) {
              selection.forEach(function(selected) {
                 vm.apple= selected['_android'];
                 console.log(vm.apple);
                 vm.recogniseImage(vm.apple);
              });
              // list.items = selection;
          }).catch(function (e) {
              // process error
          });
    }

  }
}
</script>

<style scoped>

</style>


