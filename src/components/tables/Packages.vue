<template>
  <div class="row">
    <div class="flex xs12">
      <va-card>
        <va-card-title>View Packages</va-card-title>
        <va-card-content>
          <va-data-table
            :height="height"
            :items="items2"
          />
          <!--          <va-data-table :columns="columns" :items="items" height="180"-->
          <!--                         @row:click="loadPackage">-->
          <!--            &lt;!&ndash;            <template #cell(id)="{ source: id }">&ndash;&gt;-->
          <!--            &lt;!&ndash;              <va-chip @click="loadPackage(id)">{{ id }}</va-chip>&ndash;&gt;-->
          <!--            &lt;!&ndash;            </template>&ndash;&gt;-->
          <!--          </va-data-table>-->
        </va-card-content>
      </va-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import router from '@/router';
import { Package } from '@/api';

export default defineComponent({
  name: 'packages-table',
  data() {
    const packages: Package[] = [];

    const columns = [
      { key: 'platform' },
      { key: 'owner' },
      { key: 'name' },
      { key: 'releases' },
      {
        key: 'score',
        alignHead: 'right',
        align: 'right',
      },
      { key: 'updatedAt' },
    ];

    const users = [
      {
        id: 1,
        name: 'Leanne Graham',
        username: 'Bret',
        email: 'Sincere@april.biz',
        phone: '1-770-736-8031 x56442',
        website: 'hildegard.org',
      },
      {
        id: 2,
        name: 'Ervin Howell',
        username: 'Antonette',
        email: 'Shanna@melissa.tv',
        phone: '010-692-6593 x09125',
        website: 'anastasia.net',
      },
      {
        id: 3,
        name: 'Clementine Bauch',
        username: 'Samantha',
        email: 'Nathan@yesenia.net',
        phone: '1-463-123-4447',
        website: 'ramiro.info',
      },
      {
        id: 4,
        name: 'Patricia Lebsack',
        username: 'Karianne',
        email: 'Julianne.OConner@kory.org',
        phone: '493-170-9623 x156',
        website: 'kale.biz',
      },
      {
        id: 5,
        name: 'Chelsey Dietrich',
        username: 'Kamren',
        email: 'Lucio_Hettinger@annie.ca',
        phone: '(254)954-1289',
        website: 'demarco.info',
      },
      {
        id: 6,
        name: 'Lindsey Hopkins',
        username: 'Lindsey',
        email: 'lindseyhopkins@nebulean.com',
        phone: '(254)954-1589',
        website: 'nebulean.info',
      },
      {
        id: 7,
        name: 'Head Lloyd',
        username: 'Head',
        email: 'headlloyd@nebulean.com',
        phone: '(254)954-1279',
        website: 'nebulean.info',
      },
      {
        id: 8,
        name: 'Fisher Bradford',
        username: 'Bradford',
        email: 'fisherbradford@nebulean.com',
        phone: '(254)954-5289',
        website: 'nebulean.info',
      },
    ];

    return {
      items: packages,
      columns,
      items2: users,
      height: '180px',
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.items = await this.$dltApi.getPackages();
    },
    loadPackage(e) {
      const { name } = e.item;
      router.push({
        name: 'Package',
        params: { name },
      });
    },
  },
});
</script>
<style scoped>
.va-data-table.va-data-table--sticky {
  height: 180px;
}
</style>
