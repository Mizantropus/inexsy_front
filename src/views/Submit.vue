<template lang="pug">
  div
    v-container.pt-5.pb-14(data-app)
      h1.pt-4 SUBMIT ABSTRACT

      v-row.pt-3(align="start")
        v-col.d-flex.flex-wrap(cols="12" sm="6")
          p.width-100.mb-2 Choose paper type:
            span.text-danger &nbsp;*
          v-select(:items="paper_types" label="Paper type" v-model="paper_type" required solo clearable)
        v-col.d-flex.flex-wrap(cols="12" sm="6")
          p.width-100.mb-2(v-if="paper_type == 12") Specify paper type:
            span.text-danger &nbsp;*
          v-text-field(v-if="paper_type == 12" label="Please specify" solo maxlength="64")

      v-row.pt-0(align="start")
        v-col.pb-5.d-flex.flex-wrap(cols="12" sm="6")
          //v-switch(v-model="published" label="Was a preprint for that paper published?")
          v-checkbox.mt-2(v-model="published" @change="PublishedToggle" label="Was a preprint for that paper published?")
        v-col.pt-0.pb-0.d-flex.flex-wrap(cols="12" sm="6" v-if="published")
          p.width-100.mb-2 Specify preprint DOI link:
            span.text-danger &nbsp;*
          v-text-field.mt-0(@change="CheckUrl" label="Preprint DOI link" solo maxlength="2048")

      v-row.mt-n1(align="start")
        v-col.paper_pub_status.d-flex.flex-wrap(cols="12" sm="6")
          p.width-100.mb-2 Choose paper publishing status:
            span.text-danger &nbsp;*
          v-select(:items="paper_statuses" label="Paper publishing status" v-model="paper_status" required solo clearable persistent-hint hint="Please note that your paper with Statuses #1 and #2 may receive offers for publication from different journals")
        v-col.d-flex.flex-wrap(cols="12" sm="6" v-if="paper_status == 4" )
          p.width-100.mb-2 Specify paper DOI link:
            span.text-danger &nbsp;*
          v-text-field(label="Paper DOI link" solo maxlength="2048")

      v-row.mt-n1(align="start" v-if="paper_status == 2 || paper_status == 3 || paper_status == 4")
        v-col.d-flex.flex-wrap(cols="12" sm="6")
          p.width-100.mb-2 Choose publishing model:
            span.text-danger &nbsp;*
          v-select(:items="publishing_models" label="Publishing model" v-model="publishing_model" required solo clearable)

      v-row.mt-n1(align="start")
        v-col.d-flex.flex-wrap(cols="12" sm="12")
          p.width-100.mb-2 Paper title
            span.text-danger &nbsp;*
          v-textarea(v-model="paper_title" required solo auto-grow rows="1")
      
      h3.mb-4.mt-6 Corresponding author

      v-row.mt-n1(align="start")
        v-col.d-flex.flex-wrap(cols="12" sm="6")
          p.width-100.mb-2 First name
            span.text-danger &nbsp;* 
          v-text-field(v-model="corresponding_first_name" label="First name" required solo maxlength="32")
        v-col.d-flex.flex-wrap(cols="12" sm="6")
          p.width-100.mb-2 Last name
            span.text-danger &nbsp;* 
          v-text-field(v-model="corresponding_last_name" label="Last name" required solo maxlength="32")

      v-row.mt-n5(align="start")
        v-col.d-flex.flex-wrap(cols="12" sm="6")
          p.width-100.mb-2 Middle name
          v-text-field(v-model="corresponding_middle_name" label="Middle name" solo maxlength="32")
        v-col.d-flex.flex-wrap(cols="12" sm="6")
          p.width-100.mb-2 E-mail
            span.text-danger &nbsp;* 
          v-text-field(v-model="corresponding_email" type="email" label="E-mail" required solo maxlength="64")

      v-row.mt-n5(align="start")
        v-col.d-flex.flex-wrap(cols="12" sm="6")
          p.width-100.mb-2 Orcid
          v-text-field(v-model="corresponding_orcid" label="Orcid" required solo maxlength="64" v-mask="'####-####-####-####'")

      v-row.mt-n5.flex-wrap(align="end")
        v-col.d-flex.flex-wrap(cols="12" sm="4")
          p.width-100.mb-2 Affilation
            span.text-danger &nbsp;* 
          v-text-field(v-model="affilation" label="Affilation" solo maxlength="256")
        v-col.d-flex.flex-wrap(cols="12" sm="4")
          p.width-100.mb-2 Choose affilation country:
            span.text-danger &nbsp;*
          v-select(:items="affilation_countries" label="Affilation country" v-model="affilation_country" required solo clearable)
        v-col.d-flex.flex-wrap.pb-43(cols="12" sm="4")
          v-btn.button_add_affilation(large block color="info" @click="AddAffilation") Add affilation

      v-card.grey.lighten-4.mb-6.pb-2.pr-4.pl-4(v-for="(affil, index) in affilations" fluid :elevation="1")
        v-row(align="end")
          v-col.d-flex.flex-wrap(cols="12" md="6")
            p.width-100.mb-2 Affilation {{index + 2}}
              span.text-danger &nbsp;* 
            v-text-field(v-model="affil.affilation" label="Affilation" solo maxlength="256" hide-details)
          v-col.d-flex.flex-wrap(cols="12" md="6")
            p.width-100.mb-2 Choose affilation country:
              span.text-danger &nbsp;*
            v-select(:items="affilation_countries" label="Affilation country" v-model="affil.affilation_country" required solo clearable hide-details)
          //v-col.pb-4.d-flex.flex-wrap(cols="12" md="2")
          //  v-btn(large color="neutral" block dark :elevation="2" @click="DeleteAffilation(index)" hide-details) Delete
          //    //v-icon(large) fas fa-times
          v-btn.del_affilation(small color="neutral" dark fab :elevation="1" @click="DeleteAffilation(index)")
            v-icon(large) fas fa-times

      v-row.pt-4.pb-6(align="end")
        v-col.d-flex.flex-wrap(cols="12" md="6")
          v-btn(x-large color="info" block dark :elevation="2" @click="AddAuthor"  hide-details) Add Author
        v-col.d-flex.flex-wrap(cols="12" md="6")

      v-card.grey.lighten-4.mb-6.pb-2.pr-4.pl-4(v-for="(author, index) in authors" fluid :elevation="1")
        h3.mb-2.pt-2 Author {{ index + 2 }}
        v-row.mt-n1(align="start")
          v-col.d-flex.flex-wrap(cols="12" sm="6")
            p.width-100.mb-2 First name
              span.text-danger &nbsp;* 
            v-text-field(v-model="author.author_first_name" label="First name" required solo maxlength="32")
          v-col.d-flex.flex-wrap(cols="12" sm="6")
            p.width-100.mb-2 Last name
              span.text-danger &nbsp;* 
            v-text-field(v-model="author.author_last_name" label="Last name" required solo maxlength="32")

        v-row.mt-n5(align="start")
          v-col.d-flex.flex-wrap(cols="12" sm="6")
            p.width-100.mb-2 Middle name
            v-text-field(v-model="author.author_middle_name" label="Middle name" solo maxlength="32")
          v-col.d-flex.flex-wrap(cols="12" sm="6")
            p.width-100.mb-2 E-mail
              span.text-danger &nbsp;* 
            v-text-field(v-model="author.author_email" type="email" label="E-mail" required solo maxlength="64")

        v-row.mt-n5(align="start")
          v-col.d-flex.flex-wrap(cols="12" sm="6")
            p.width-100.mb-2 Orcid
            v-text-field(v-model="author.author_orcid" label="Orcid" required solo maxlength="64" v-mask="'####-####-####-####'")

        v-row.mt-n5.flex-wrap(align="end")
          v-col.d-flex.flex-wrap(cols="12" sm="4")
            p.width-100.mb-2 Affilation
              span.text-danger &nbsp;* 
            v-text-field(v-model="author.affilation" label="Affilation" solo maxlength="256")
          v-col.d-flex.flex-wrap(cols="12" sm="4")
            p.width-100.mb-2 Choose affilation country:
              span.text-danger &nbsp;*
            v-select(:items="affilation_countries" label="Affilation country" v-model="author.affilation_country" required solo clearable)
          v-col.d-flex.flex-wrap.pb-43(cols="12" sm="4")
            v-btn.button_add_affilation(large block color="info" @click="AddAffilationAuthor(author)") Add affilation
        
        v-card.grey.lighten-3.mb-6.pb-2.pr-3.pl-3(v-for="(affil, aff_index) in author.affilations" fluid :elevation="1")
          v-row(align="end")
            v-col.d-flex.flex-wrap(cols="12" md="6")
              p.width-100.mb-2 Affilation {{aff_index + 2}}
                span.text-danger &nbsp;* 
              v-text-field(v-model="affil.affilation" label="Affilation" solo maxlength="256" hide-details)
            v-col.d-flex.flex-wrap(cols="12" md="6")
              p.width-100.mb-2 Choose affilation country:
                span.text-danger &nbsp;*
              v-select(:items="affilation_countries" label="Affilation country" v-model="affil.affilation_country" required solo clearable hide-details)
            //v-col.pb-4.d-flex.flex-wrap(cols="12" md="2")
            //  v-btn(large color="neutral" block dark :elevation="2" @click="DeleteAuthorAffilation(author, index, aff_index)" hide-details) Delete
            v-btn.del_affilation(small color="neutral" dark fab :elevation="1" @click="DeleteAuthorAffilation(author, index, aff_index)")
              v-icon(large) fas fa-times

        v-btn.del_affilation(small color="neutral" dark fab :elevation="1" @click="DeleteAuthor(index)")
          v-icon(large) fas fa-times

      v-row.mt-4(align="start")
        v-col.d-flex.flex-wrap(cols="12" sm="12")
          p.width-100.mb-2 Abstract
            span.text-danger &nbsp;*
          tiptap-vuetify.width-100(v-model="abstract" :extensions="extensions" maxlength="4096")
          p.p_hint.mt-2 You can use LaTeX commands. Please write in English only

      h3 Preview
      v-row.mt-4(align="start")
        v-col.d-flex.flex-wrap(cols="12" sm="12")
          v-card.grey.lighten-4.mb-6.pb-2.pr-3.pl-3.width-100(fluid :elevation="0" ) 
            div(v-html="abstract" v-katex:auto)
            div(v-katex:auto) \(\frac{a_i}{1+x}\)

      v-row.mt-n1(align="start")
        v-col.d-flex.flex-wrap(cols="12" sm="12")
          p.width-100.mb-2 Novelty & Actuality:
            span.text-danger &nbsp;*
          v-textarea(v-model="novelty_actuality" required solo auto-grow rows="3" maxlength="512")

      v-row.mt-n1(align="start")
        v-col.d-flex.flex-wrap(cols="12" sm="12")
          p.width-100.mb-2 Keywords:
            span.text-danger &nbsp;*
          v-textarea(v-model="keywords" required solo auto-grow rows="1" maxlength="256")

      v-row.pt-3(align="start")
        v-col.d-flex.flex-wrap(cols="12" sm="6")
          p.width-100.mb-2 Choose science area:
            span.text-danger &nbsp;*
          v-select(:items="science_areas" label="Science area" v-model="science_area" @change="SetSubjects" required solo clearable)
        v-col.d-flex.flex-wrap(cols="12" sm="6" v-if="science_area != 4 && science_area")
          p.width-100.mb-2 Choose area subject:
            span.text-danger &nbsp;*
          v-select(:items="area_subjects" label="Area subject" v-model="area_subject" required solo clearable)
        v-col.d-flex.flex-wrap(cols="12" sm="6" v-if="science_area == 4")
          p.width-100.mb-2 Specify area subject:
            span.text-danger &nbsp;*
          v-text-field(v-model="area_subject_specify" label="Please specify" solo maxlength="64")

      v-row.pt-3(align="start")
        v-col.d-flex.flex-wrap.choose_language(cols="12" sm="6")
          p.width-100.mb-2 Choose language:
            span.text-danger &nbsp;*
          v-select(:items="languages" label="Language" v-model="language" required solo clearable persistent-hint hint="The full text of the paper can be in ANY language. Only Abstract should be in English")
        v-col.d-flex.flex-wrap(cols="12" sm="6" v-if="area_subject == 4")
          p.width-100.mb-2 Specify area subject:
            span.text-danger &nbsp;*
          v-text-field(v-model="area_subject_specify" label="Please specify" solo maxlength="64")

      v-row.pt-3(align="start")
        v-col.d-flex.flex-wrap.choose_language(cols="12" sm="12")
          p Please fill in all the fields marked asterisk (<span class="text-danger">*</span>)

      v-row.pt-4.pb-6(align="end")
        v-col.d-flex.flex-wrap(cols="12" md="6")
          v-btn(x-large color="success" block dark :elevation="2" @click="Submit"  hide-details) Save
        v-col.d-flex.flex-wrap(cols="12" md="6")
            

</template>

<script>
//import axios from 'axios'
import { TiptapVuetify, Heading, Bold, Italic, Strike, Underline, Code, Paragraph, BulletList, OrderedList, ListItem, Link, Blockquote, HardBreak, HorizontalRule, History } from 'tiptap-vuetify'
import {mask} from 'vue-the-mask'
export default {
  name: 'Submit',
  directives: {mask},
  components: { TiptapVuetify },
  data () {
    return {
      paper_type: null,
      paper_status: null,
      publishing_model: null,
      science_area: null,
      area_subject: null,
      language: null,
      published: false,
      abstract: "",
      keywords: "",
      novelty_actuality: "",
      paper_title: "",
      affilation: "",
      affilation_country: null,
      corresponding_first_name: "",
      corresponding_last_name: "",
      corresponding_middle_name: "",
      corresponding_email: "",
      corresponding_orcid: "",
      area_subject_specify: "",
      affilation_tmp: {
        affilation: "",
        affilation_country: null,
      },
      author_tmp: {
        affilation: "",
        affilation_country: null,
        author_first_name: "",
        author_last_name: "",
        author_middle_name: "",
        author_email: "",
        author_orcid: "",
        affilations: [],
      },
      affilations: [],
      authors: [],
      extensions: [
        History,
        Blockquote,
        Link,
        Underline,
        Strike,
        Italic,
        ListItem,
        BulletList,
        OrderedList,
        [Heading, {
          options: {
            levels: [1, 2, 3]
          }
        }],
        Bold,
        Link,
        Code,
        HorizontalRule,
        Paragraph,
        HardBreak
      ],
      publishing_models:[
        {
          text: 'Open access',
          value: 1,
        },
        {
          text: 'Subscription',
          value: 2,
        },
      ],
      affilation_countries: [
        {
          text: 'Russia',
          value: 1,
        },
        {
          text: 'USA',
          value: 2,
        },
        {
          text: 'China',
          value: 3,
        },
      ],
      languages: [
        {
          text: 'Russian',
          value: 1,
        },
        {
          text: 'English',
          value: 2,
        },
        {
          text: 'Chinese',
          value: 3,
        },
      ],
      science_areas: [
        {
          text: 'Chemistry',
          value: 1,
        },
        {
          text: 'Phisics',
          value: 2,
        },
        {
          text: 'Mathematics',
          value: 3,
        },
        {
          text: 'Other',
          value: 4,
        },
      ],
      area_subjects: [
        {
          text: 'Chemistry',
          value: 1,
        },
        {
          text: 'Phisics',
          value: 2,
        },
        {
          text: 'Mathematics',
          value: 3,
        },
        {
          text: 'Other',
          value: 4,
        },
      ],
      area_subjects_list: [
        {
          parrent_science: 1,
          subjects: [
            {
              text: 'Sub chemistry 1',
              value: 1,
            },
            {
              text: 'Sub chemistry 2',
              value: 2,
            },
            {
              text: 'Sub chemistry 3',
              value: 3,
            },
            {
              text: 'Other',
              value: 4,
            },
          ]
        },
        {
          parrent_science: 2,
          subjects: [
            {
              text: 'Sub Phisics 1',
              value: 1,
            },
            {
              text: 'Sub Phisics 2',
              value: 2,
            },
            {
              text: 'Sub Phisics 3',
              value: 3,
            },
            {
              text: 'Other',
              value: 4,
            },
          ]
        },
        {
          parrent_science: 3,
          subjects: [
            {
              text: 'Sub Mathematics 1',
              value: 1,
            },
            {
              text: 'Sub Mathematics 2',
              value: 2,
            },
            {
              text: 'Sub Mathematics 3',
              value: 3,
            },
            {
              text: 'Other',
              value: 4,
            },
          ]
        },
      ],
      paper_statuses:[
        {
          text: 'Manuscript in progerss',
          value: 1,
        },
        {
          text: 'Manuscript ready, looking for publisher',
          value: 2,
        },
        {
          text: 'Manuscript submitted and under review',
          value: 3,
        },
        {
          text: 'Paper published online with DOI',
          value: 4,
        },
      ],
      paper_types: [
        {
          text: 'Research article',
          value: 1,
        },
        {
          text: 'Review article',
          value: 2,
        },
        {
          text: 'Conference paper',
          value: 3,
        },
        {
          text: 'Brief report',
          value: 4,
        },
        {
          text: 'Short paper',
          value: 5,
        },
        {
          text: 'Letter',
          value: 6,
        },
        {
          text: 'Rapid communication',
          value: 7,
        },
        {
          text: 'Product review',
          value: 8,
        },
        {
          text: 'Book review',
          value: 9,
        },
        {
          text: 'Announcment',
          value: 10,
        },
        {
          text: 'News',
          value: 11,
        },
        {
          text: 'Other',
          value: 12,
        },
      ],
    }
  },
  methods: {
    CheckUrl(){
      this.$swal("Good job!", "You are ready to start!", "success")
    },
    Submit(){
      this.$swal("Congratulations!", 'Your Abstract has been submittes successfully! You can edit it in the section "My collections"', "success")
    },
    PublishedToggle(){
      if(this.published){
        this.paper_statuses.push(
          {
            text: 'Manuscript is published as a preprint only, not as an article',
            value: 5,
          }
        )
      }else{
        this.paper_statuses.pop()
      }
    },
    AddAffilation(){
      this.affilations.push(
        JSON.parse(JSON.stringify(this.affilation_tmp))
      )
    },
    AddAffilationAuthor(author){
      author.affilations.push(
        JSON.parse(JSON.stringify(this.affilation_tmp))
      )
    },
    DeleteAffilation(index){
      this.affilations.splice(index,1);
    },
    DeleteAuthor(index){
      this.authors.splice(index,1);
    },
    DeleteAuthorAffilation(author, index, aff_index){
      this.authors[index].affilations.splice(aff_index,1);
    },
    AddAuthor(){
      this.authors.push(
        JSON.parse(JSON.stringify(this.author_tmp))
      )
    },
    SetSubjects(){
      for(let i=0; i<this.area_subjects_list.length; i++){
        if(this.area_subjects_list[i].parrent_science == this.science_area){
          this.area_subjects = this.area_subjects_list[i].subjects
          break
        }
      }
    },
  },
}
</script>

<style lang="sass">
  .paper_pub_status, .choose_language
    .v-messages__message
      line-height: 18px
      font-size: 14px
      color: #b5b5b5
  .button_add_affilation
    =media()
  .del_affilation
    position: absolute !important
    top: -10px
    right: -10px
  .p_hint
    line-height: 18px
    font-size: 14px
    color: #b5b5b5
</style>