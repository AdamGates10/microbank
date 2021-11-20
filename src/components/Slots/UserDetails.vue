<template>
  <v-container fluid>
    <v-simple-table>
      <tbody>
        <tr>
          <td>Name</td>
          <td><slot name="name"> </slot></td>
        </tr>

        <tr>
          <td>Date of Birth</td>
          <td><slot name="dob"> </slot></td>
        </tr>

        <tr>
          <td>Address</td>
          <td><slot name="address"> </slot></td>
        </tr>

        <tr>
          <td>Mobile Number</td>
          <td><slot name="mobile_number"> </slot></td>
        </tr>

        <tr>
          <td>Next Of Kin</td>
          <td><slot name="next_of_kin"> </slot></td>
        </tr>

        <tr>
          <td>Next Of Kin Mobile Number</td>
          <td><slot name="kin_mobile_number"> </slot></td>
        </tr>

        <tr>
          <td>Next Of Kin Date of Birth</td>
          <td><slot name="kin_dob"> </slot></td>
        </tr>
      </tbody>
    </v-simple-table>
  </v-container>
</template>

<style scoped>
  tr:nth-child(even) {
    background-color: #eeecec;
  }
</style>