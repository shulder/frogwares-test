<template>
  <!-- if quests data is already fetched -->
  <div 
    v-if="quests"
    key="content-loaded"
  >
    <h1>Quests list</h1>
    <!-- table component from vue-bootstrap library is used -->
    <!-- 'items' and 'fields' props must be of type Array -->
    <b-table 
      bordered 
      fixed 
      hover 
      :items="quests" 
      :fields="questsTableFields" 
      @row-clicked="$_tableRowClickHandler"
    >
      <!-- determine which icon should be rendered in status table row -->
      <template 
        slot="[status]" 
        slot-scope="data"
      >
        <checkmark-icon 
          v-if="data.value === 'SUCCESS'" 
          class="icon-success" 
        />
        <close-icon 
          v-else-if="data.value === 'CRASH'" 
          class="icon-crash" 
        />
        <minus-icon v-else />
      </template>
    </b-table>
  </div>
  <!-- display loading spinner if data is not fetched yet -->
  <div 
    v-else
    key="content-loading" 
    class="spinner-border spinner-centered"
  >
  </div>
</template>

<script>
// using svg icons library
import { CheckmarkIcon, CloseIcon, MinusIcon } from 'vue-bytesize-icons'; 

export default {
  name: 'MainPage',
  components: {
    CheckmarkIcon,
    CloseIcon,
    MinusIcon,
  },
  data() {
    return {
      // no need for 'globalId' in JSON to be displayed in Quests table 
      // thus explicitly name all the table fields
      questsTableFields: ['alias', 'status'],
      quests: null,
    };
  },
  async created() {
    try {
      // fetching the right data from server in JSON format
      const { data } = await this.$http.get('/quests');
      this.quests = data;
    } catch (err) {
      // manually redirecting to error page, specifying error type as a prop
      this.$router.push({ 
        name: 'ServerConnectionErrorPage',
        params: {
          type: 'serverConnectionError',
        }
      });
    }
  },
  methods: {
    $_tableRowClickHandler(quest) {
      if (quest.status === 'NO_DATA') {
        // manually redirecting to error page, specifying error type as a prop
        this.$router.push({ 
          name: 'QuestInfoErrorPage',
          params: {
            type: 'questInfoError',
          }
        });
      } else {
        // redirecting to quest page, passing quest data as URL params
        this.$router.push({ 
          name: 'QuestPage', 
          params: { 
            alias: quest.alias,
            globalId: quest.globalId, 
          }, 
        });
      };
    }
  },
};
</script>
