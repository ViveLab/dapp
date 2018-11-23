<template>
  <div class="home">
    <div>
      Name: {{name}}
    </div>
    <div>
      Account: {{coinbase}}
    </div>
    <div>
      Is Owner?: {{isOwner ? 'Yes' : 'No'}}
    </div>
  </div>
</template>

<script>
  import {mapActions, mapState} from 'vuex'
  import * as constants from '@/store/constants'

  export default {
    name: 'home',
    computed: {
      ...mapState({
        name: state => state.Certifier.name,
        coinbase: state => state.Certifier.coinbase,
        isOwner: state => state.Certifier.isOwner
      })
    },
    methods: {
      ...mapActions({
        init: constants.CERTIFIER_INIT
      })
    },
    created() {
      this.init()
    }
  }
</script>
