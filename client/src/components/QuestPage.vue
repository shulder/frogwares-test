<template>
  <!-- if quest data is already fetched -->
  <div 
    v-if="quest"
    key="content-loaded"
  >
    <h3>Quest information</h3>
    <!-- table component from vue-bootstrap library is used -->
    <!-- 'items' and 'fields' props must be of type Array -->
    <b-table 
      bordered 
      fixed 
      :items="[quest]" 
      :fields="questInfoTableFields"
    />
    <h3>Quest pathway</h3>
    <b-table 
      bordered 
      fixed 
      :items="[quest.pathway]"
    >
      <!-- create a sequence of icons in status table row -->
      <template 
        slot="[leafs]" 
        slot-scope="data"
      >
        <span 
          v-for="(leaf, index) in data.value" 
          :key="`leaf-${index}`"
        >
          <checkmark-icon 
            v-if="leaf" 
            class="icon-success icon-small" 
          />
          <close-icon 
            v-else 
            class="icon-crash icon-small" 
          />
          <!-- prevent arrow from being displayed after the last checkmark/cross icon -->
          <arrow-right-icon 
            v-if="index !== data.value.length - 1" 
            class="icon-arrow" 
          />
        </span>
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
import { ArrowRightIcon, CheckmarkIcon, CloseIcon } from 'vue-bytesize-icons'; 

export default {
  name: 'QuestPage',
  components: {
    ArrowRightIcon,
    CheckmarkIcon,
    CloseIcon,
  },
  data() {
    return {
      // no need for 'Pathway' field in JSON to be displayed in QuestInfo table
      // thus explicitly name all the table fields
      questInfoTableFields: ['buildId', 'platform', 'name'],
      quest: null,
    };
  },
  async created() {
    // extract quest params from URL
    const { alias, globalId } = this.$route.params;
    try {
      // fetching the right data from server in JSON format  
      const { data } = await this.$http.get(`quests/${alias}/${globalId}`);
      this.quest = data;
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
};
</script>
