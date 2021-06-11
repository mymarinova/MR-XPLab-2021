
// Every experiment should start with an intro view. Here you can welcome your participants and tell them what the experiment is about
const intro = magpieViews.view_generator("intro", {
    trials: 1,
    name: 'intro',
    title: 'Our experiment',
    // If you use JavaScripts Template String `I am a Template String`, you can use HTML <></> and javascript ${} inside
    text:   `Thank you for joining our experiment, this is helping us a lot.`,
   buttonText: 'Start the experiment'
});

// For most tasks, you need instructions views
const instructions_practice = magpieViews.view_generator("instructions", {
    trials: 1,
    name: 'instructions_practice',
    title: 'General Instructions',
    text:  `In the following practice trial, you will see pictures showing pairs which show geometrical objects. Your task is going to be to compare both objects and decide whether they are the same or different. Just press button "F" if you think the objects are the same, and "J" if you think they are different. Please try to answer as quick and accurately as possible!`,
    buttonText: 'continue to practice trial'
});

const instructions_main = magpieViews.view_generator("instructions", {
    trials: 1,
    name: 'instructions_main',
    title: 'Get ready for the main experiment',
    text:  `After having practiced, we will now proceed to the main experiment. Please do not forget to answer as quickly and accurately as possible!`,
    buttonText: 'start main trial'
});




    // You can change much of what appears here, e.g., to present it in a different language, as follows:
    // buttonText: 'Weiter',
    // age_question: 'Alter',
    // gender_question: 'Geschlecht',
    // gender_male: 'männlich',
    // gender_female: 'weiblich',
    // gender_other: 'divers',
    // edu_question: 'Höchster Bildungsabschluss',
    // edu_graduated_high_school: 'Abitur',
    // edu_graduated_college: 'Hochschulabschluss',
    // edu_higher_degree: 'Universitärer Abschluss',
    // languages_question: 'Muttersprache',
    // languages_more: '(in der Regel die Sprache, die Sie als Kind zu Hause gesprochen haben)',
    // comments_question: 'Weitere Kommentare'


    // In the post test questionnaire you can ask your participants addtional questions
    const postTest = magpieViews.view_generator("post_test", {
        trials: 1,
        name: 'post_test',
        title: 'Additional information',
        text: 'Answering the following questions is optional, but your answers will help us analyze our results.'
      });


        // additional questions for participants in order to analyze their results - auskommentiert da es nicht akzeptiert wird
      /* const postTest = magpieViews.view_generator("post_test", {
          trials: 1,
          name: 'post_test',
          title: 'Additional information',
          text: 'You do not have to answer the next questions, but your answers would help us a lot for understanding and analyzing your results.',
          buttonText: 'Answer questions',
          question_age: 'Age';,
          question_sex: 'Sex';,
          question_sex_male: 'Male',
          question_sex_female: 'Female',
          question_sex_other: 'Diverse',
          question_demographics: 'Demographical information',
          question_mother_tongue: 'Mother tongue',
          question_other_languages: 'Other languages',
          question_age_english_aquisition: 'Age to learn english',
          question_education: 'Education',
          question_education_high_school: 'High School',
          question_education_college: 'College',
          question_education_higher_degree: 'Higher degree',
          question_education_other: 'Other',
          question_occupation: 'Occupation'
      });

      */

// The 'thanks' view is crucial; never delete it; it submits the results!
const thanks = magpieViews.view_generator("thanks", {
    trials: 1,
    name: 'thanks',
    title: 'Thank you for taking part in this experiment!',
    prolificConfirmText: 'Press the button'
  });

/** trial (magpie's Trial Type Views) below

* Obligatory properties

    - trials: int - the number of trials this view will appear
    - name: string - the name of the view type as it shall be known to _magpie (e.g. for use with a progress bar)
    - trial_type: string - the name of the trial type as you want it to appear in the submitted data
    - data: array - an array of trial objects

* Optional properties

    - pause: number (in ms) - blank screen before the fixation point or stimulus show
    - fix_duration: number (in ms) - blank screen with fixation point in the middle
    - stim_duration: number (in ms) - for how long to have the stimulus on the screen
        More about trial life cycle - https://github.com/magpie-project/magpie-project/blob/master/docs/views.md#trial-views-lifecycle

    - hook: object - option to hook and add custom functions to the view
        More about hooks - https://github.com/magpie-project/magpie-project/blob/master/docs/views.md#trial-views-hooks

* All about the properties of trial - https://github.com/magpie-project/magpie-project/blob/master/docs/views.md#properties-of-trial
*/

// Here, we initialize a keyPress task
const practice = custom_views.keypress_rotation_practice({
    trials: 12,
    // trials: 2,
    name: 'practice',
    trial_type: 'practice',
    pause: 250,
    stim_duration: 500,
    data: _.shuffle(practice_trials.key_press),
    key1: "f",
    key2: "j",
    f: "same",
    j: "different",
});


const main = custom_views.keypress_rotation_main({
    trials: 48,
    // trials: 8,
    name: 'main',
    trial_type: 'main',
    pause: 250,
    stim_duration: 500,
    data: _.shuffle(main_trials.key_press),
    key1: "f",
    key2: "j",
    f: "same",
    j: "different",
});

//call this function to open the view, auskommentiert da es nicht funktioniert
//const check_response = magpieViews.view_generator("key_press", {
//    trials: trial_info.check_response.length,
  //  name: 'check_response',
    //data: trial_info.check_response,
  //  hook: {
    //    after_response_enabled: check_response
    //}

//});


//participants can rate how easy/difficult this task was for them
const statistical_experiment_rating = magpieViews.view_generator("rating_scale", {
    trials: 1,
    name: 'experiment_rating',
    title: 'Rating the experiment',
    text: 'You are now finished with the experiment! Please rate the experiment as to how easy (or difficult) you think it was. There are no right or wrong answers.',
    data: [{
        question: "Please rate the experiment from 1 (very easy), to 10 (extremely difficult)?",
        optionLeft: '',
        optionRight: ''
    }]
  },

  {
      stimulus_container_generator: function(config, CT) {
          return `<div class='magpie-view'>
                    <h1 class='magpie-view-title'>${config.title}</h1>
                    <p class='magpie-view-question'></p>
                </div>`;
      }
  });



// There are many more templates available:
// forcedChoice, sliderRating, dropdownChoice, testboxInput, ratingScale, imageSelection, sentenceChoice, keyPress, selfPacedReading and selfPacedReading_ratingScale
