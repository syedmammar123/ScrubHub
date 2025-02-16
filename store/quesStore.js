import { create } from "zustand";
import { db } from "@/config/firebase";
import {
  collection,
  getDocs,
  doc,
  writeBatch,
  updateDoc,
  serverTimestamp,
  getDoc,
  addDoc,
} from "@react-native-firebase/firestore";
import useCurrentUserStore from "./currentUserStore";

// Pick Random Questions from All Topics
const pickRandQues = async (questions) => {
  const totalQuestions = questions.length;
  const numToPick = 15;

  const chunkSize = Math.ceil(totalQuestions / numToPick);

  let pickedQuestions = [];

  for (let i = 0; i < numToPick; i++) {
    const start = i * chunkSize;
    const end = Math.min(start + chunkSize, totalQuestions);

    const chunk = questions.slice(start, end);

    if (chunk.length > 0) {
      const randomIndex = Math.floor(Math.random() * chunk.length);
      pickedQuestions.push(chunk[randomIndex]);
    }
  }

  console.log("Picked Questions:", pickedQuestions);
  return pickedQuestions;
};

// Review Questions Picking
const reviewQues = (docs) => {
  let unreviewed = docs.filter((doc) => !doc.isReviewed);

  if (unreviewed.length === 0) {
    let sortedDocs = docs.sort((a, b) => {
      const dateA = a.lastReviewed ? a.lastReviewed.toDate() : new Date(0);
      const dateB = b.lastReviewed ? b.lastReviewed.toDate() : new Date(0);
      return dateA - dateB; // Oldest first
    });
    return sortedDocs.slice(0, 15);
  }

  if (unreviewed.length === 15) {
    return unreviewed;
  }
  let sortedUnreviewed = unreviewed.sort((a, b) => {
    const dateA = a.submittedOn ? a.submittedOn.toDate() : new Date(0);
    const dateB = b.submittedOn ? b.submittedOn.toDate() : new Date(0);
    return dateA - dateB; // Oldest first
  });

  return sortedUnreviewed.slice(0, 15);
};

const prevSolvedQuestions = async (system, topic) => {
  let solvedQuestions = [];
  const curUser = useCurrentUserStore.getState().getUser();
  try {
    const getPrevQuesRef = collection(
      db,
      "Users",
      curUser.id,
      "solved",
      system,
      topic
    );
    const prevQues = await getDocs(getPrevQuesRef);
    prevQues.forEach((doc) => {
      solvedQuestions.push(doc.id);
    });
    return solvedQuestions;
  } catch (error) {
    console.log(error.message);
  }
};

// Pick 15 Questions from 90, filtering out solved questions
const pickQues = async (system, topic, docs) => {
  console.log("CALLED");

  const solvedQuestions = await prevSolvedQuestions(system, topic);
  console.log("Solved Questions: ", solvedQuestions);

  const unsolvedQuestions = docs.filter(
    (doc) => !solvedQuestions.includes(doc.id)
  );

  if (unsolvedQuestions.length === 15) {
    console.log("YES UNSOLVED QUESTIN LENGTH 15");

    return unsolvedQuestions;
  }
  if (unsolvedQuestions.length < 15) {
    console.log("Not enough unsolved questions, adjusting the number to pick.");
  }

  const shuffled = unsolvedQuestions.sort(() => Math.random() - 0.5);
  const pickedQues = shuffled.slice(0, 15);

  console.log("Picked Questions:", pickedQues);

  return pickedQues;
};
const useQuesStore = create((set, get) => ({
  type: "",

  // type (study)
  fetchedQuestionTopic: "",
  fetchedQuestionSystem: "",
  questions: [],
  score: 0,
  currentIndex: 0,

  // type (review)
  fetchedReviewQuestionSystem: "",
  fetchedReviewQuestionTopic: "",
  reviewQuestions: [],
  isLoading: false,
  currentIndexReview: 0,
  reviewScore: 0,

  // type (dailyChallenge)
  challengeQuestions: [],
  currentChallengeId: "",
  currentChallengeIndex: 0,
  scoreChallenge: 0,

  // type (FriendChallenge)
  friendChallengeQuestions: [],
  currentFriendChallengeId: "",
  currentFriendChallengeIndex: 0,
  currentFriendChallengeScore: null,
  currentOpponentScore: 0,
  currentChallengerId: "",
  challengerUsername: "",

  // type (ChallengingFriends)
  challengingFriendsQuestions: [],
  challengingFriendsIndex: 0,
  challengingScore: 0,
  opponentId: "",

  //this clears all fields related to attempt challenge
  clearFields: () => {
    set({ currentFriendChallengeScore: null });
    set({ currentFriendChallengeIndex: 0 });
    set({ currentFriendChallengeId: "" });
    set({ currentOpponentScore: 0 });
    set({ currentChallengerId: "" });
    set({ friendChallengeQuestions: [] });
    set({ type: "" });
    set({ challengerUsername: "" });
  },

  //this clears all the fields related to review
  clearReviewFields: () => {
    set({ fetchedReviewQuestionSystem: "" });
    set({ fetchedReviewQuestionTopic: "" });
    set({ reviewQuestions: [] });
    set({ currentIndexReview: 0 });
    // set({ reviewScore: 0 });
    set({ type: "" });
  },

  clearFieldsAfterAttempt: () => {
    set({ friendChallengeQuestions: [] });
    set({ currentFriendChallengeIndex: 0 });
    set({ currentFriendChallengeId: "" });
    set({ currentChallengerId: "" });
  },
  // clear field before we fetch questions for challenging friend from "Play with friends"
  clearFields2: () => {
    set({ challengingFriendsQuestions: [] });
    set({ challengingFriendsIndex: 0 });
    set({ opponentId: "" });
    set({ challengingScore: 0 });
    set({ type: "" });
  },

  // Clearing Fields after challenging friend from "Play with friends"
  clearFieldsAfterChallengeFriend: () => {
    set({ challengingFriendsQuestions: [] });
    set({ challengingFriendsIndex: 0 });
    set({ opponentId: "" });
    // set({ type: "" });
  },

  increaseFriendChallengeScore: () =>
    set((state) => ({
      currentFriendChallengeScore: state.currentFriendChallengeScore + 1,
    })),

  increaseFriendChallengeIndex: () =>
    set((state) => ({
      currentFriendChallengeIndex: state.currentFriendChallengeIndex + 1,
    })),

  getFriendChallengeScore: () => {
    const { currentFriendChallengeScore } = get();
    return currentFriendChallengeScore;
  },

  getOpponentScore: () => {
    const { currentOpponentScore } = get();
    return currentOpponentScore;
  },

  getChallengerUsername: () => {
    const { challengerUsername } = get();
    return challengerUsername;
  },

  getFriendChallengeQuestion: () => {
    const { friendChallengeQuestions, currentFriendChallengeIndex } = get();
    return friendChallengeQuestions[currentFriendChallengeIndex];
  },

  getFetchedFriendChallengeID: () => {
    const { currentFriendChallengeId } = get();
    return currentFriendChallengeId;
  },
  // fetchChallengeFriendQuestions: (challenge, type) => {
  //   console.log("CHALLENGEIN STORE", challenge);
  //   if (type === "friend") {
  //     console.log("CALLED FROM friend Screen");
  //     if (challenge.questions.length > 0) {
  //       set({ currentFriendChallengeIndex: 0 });
  //       set({ friendChallengeQuestions: challenge.questions.slice(0, 16) });
  //       set({ currentFriendChallengeScore: 0 });
  //       // set({ currentOpponentScore: challenge.challengerScore });
  //       set({ currentFriendChallengeId: "" });
  //       // set({ currentFriendChallengeId: challenge.id });
  //       // set({ currentChallengerId: challenge.challengerId });
  //       // set({ challengerUsername: challengerUsername });
  //       return challenge.questions.length;
  //     } else {
  //       return 0;
  //     }
  //   } else {
  //     if (challenge.questions.length > 0) {
  //       set({ currentFriendChallengeIndex: 0 });
  //       set({ friendChallengeQuestions: challenge.questions });
  //       set({ currentFriendChallengeScore: 0 });
  //       set({ currentOpponentScore: challenge.challengerScore });
  //       set({ currentFriendChallengeId: challenge.id });
  //       set({ currentChallengerId: challenge.challengerId });
  //       set({ challengerUsername: challengerUsername });
  //       return challenge.questions.length;
  //     } else {
  //       return 0;
  //     }
  //   }
  // },

  fetchChallengeFriendQuestions: (challenge) => {
    console.log("CHALLENGEIN STORE", challenge);

    console.log("CALLED FROM friend Screen");

    if (challenge.questions.length > 0) {
      set({ currentFriendChallengeIndex: 0 });
      set({ friendChallengeQuestions: challenge.questions });
      set({ currentFriendChallengeScore: 0 });
      set({ currentOpponentScore: challenge.challengerScore });
      set({ currentFriendChallengeId: challenge.id });
      set({ currentChallengerId: challenge.challengerId });
      set({ challengerUsername: challenge.challengerUsername });
      return challenge.questions.length;
    } else {
      return 0;
    }
  },

  submitFriendChallenge: async () => {
    try {
      const docId = get().currentFriendChallengeId; // Get the document ID
      const challengeRef = doc(db, "Challenges", docId); // Reference to the document

      await updateDoc(challengeRef, {
        opponentScore: get().currentFriendChallengeScore,
      });

      console.log("Document successfully updated!");
    } catch (error) {
      console.error("Error Updating documents: ", error);
    }
  },

  increaseChallengingFriendsScore: () =>
    set((state) => ({
      challengingScore: state.challengingScore + 1,
    })),

  increaseChallengingFriendsIndex: () =>
    set((state) => ({
      challengingFriendsIndex: state.challengingFriendsIndex + 1,
    })),

  getChallengingScore: () => {
    // Your Current Challenging Score
    const { challengingScore } = get();
    return challengingScore;
  },

  getChallengingFriendsQuestion: () => {
    const { challengingFriendsQuestions, challengingFriendsIndex } = get();
    return challengingFriendsQuestions[challengingFriendsIndex];
  },

  getChallengingFriendsAllQuestion: () => {
    const { challengingFriendsQuestions } = get();
    return challengingFriendsQuestions;
  },

  getOpponentID: () => {
    const { opponentId } = get();
    return opponentId;
  },

  fetchChallengingFriendsQuestions: (challenge, friendId) => {
    console.log("CHALLENGEIN STORE", challenge);

    if (challenge.length > 0) {
      set({ challengingFriendsIndex: 0 });
      set({ challengingFriendsQuestions: challenge });
      set({ challengingScore: 0 });

      set({ opponentId: friendId }); //Track to not fetch questions again

      return challenge.length;
    } else {
      return 0;
    }
  },

  submitChallengingFriend: async () => {
    const q = get().challengingFriendsQuestions;
    const oppId = get().opponentId;
    const user = useCurrentUserStore.getState().getUser();
    const userId = user.id;
    try {
      const challengeRef = collection(db, "Challenges"); // Reference to the collection

      const docRef = await addDoc(challengeRef, {
        questions: q,
        opponentId: oppId,
        challengerId: userId,
        opponentScore: null,
        challengerScore: get().challengingScore,
        status: "pending",
        timestamp: serverTimestamp(), // Add timestamp if needed
      });

      // Apply Send Notifications here

      // Clearing Fields
      set({ challengingFriendsQuestions: [] });
      set({ challengingFriendsIndex: 0 });
      set({ opponentId: "" });

      console.log("Document successfully added with ID: ", docRef.id);
      return docRef.id;
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  },

  increaseScore: () => set((state) => ({ score: state.score + 1 })),

  increaseChallengeScore: () =>
    set((state) => ({ scoreChallenge: state.scoreChallenge + 1 })),

  increaseReviewScore: () =>
    set((state) => ({ reviewScore: state.reviewScore + 1 })),

  getScore: () => {
    const { score } = get();
    return score;
  },

  getChallengeScore: () => {
    const { scoreChallenge } = get();
    return scoreChallenge;
  },

  getReviewScore: () => {
    const { reviewScore } = get();
    return reviewScore;
  },

  increaseCurrentIndex: () =>
    set((state) => ({ currentIndex: state.currentIndex + 1 })),

  increaseCurrentReviewIndex: () =>
    set((state) => ({ currentIndexReview: state.currentIndexReview + 1 })),

  increaseCurrentChallengeIndex: () =>
    set((state) => ({
      currentChallengeIndex: state.currentChallengeIndex + 1,
    })),

  fetchQuestions: async (system, topic) => {
    set({ isLoading: true });
    // Setting Index 0 for Questions
    set({ currentIndex: 0 });
    set({ score: 0 });
    if (Array.isArray(topic)) {
      try {
        let questions = [];
        console.log("Topics:", topic);

        const shuffledTopics = topic.sort(() => 0.5 - Math.random());
        const selectedTopics = shuffledTopics.slice(0, 15);

        const queryPromises = selectedTopics.map(async (t) => {
          const querySnapshot = await getDocs(
            collection(db, `Questions/${system}/${t}`)
          );
          console.log(
            `Topic ${t} returned`,
            querySnapshot.docs.length,
            "questions"
          );
          return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
        });
        const allQuestions = await Promise.all(queryPromises);
        questions = allQuestions.flat();

        // console.log("Combined Questions:", questions);
        const pickedQues = await pickRandQues(questions);

        set({ questions: pickedQues });
        set({ fetchedQuestionSystem: system });
        set({ fetchedQuestionTopic: `${system}all` });
      } catch (error) {
        console.error("Error fetching documents: ", error);
      } finally {
        set({ isLoading: false });
      }
    } else {
      try {
        const querySnapshot = await getDocs(
          collection(db, `Questions/${system}/${topic}`)
        );

        let documents = [];
        querySnapshot.forEach((doc) => {
          documents.push({ id: doc.id, ...doc.data() });
        });

        const pickedQuestions = await pickQues(system, topic, documents);
        console.log("PICKED QUESTIONS:", pickedQuestions.length);

        if (pickedQuestions.length > 0) {
          set({ questions: pickedQuestions });
          set({ fetchedQuestionSystem: system });
          set({ fetchedQuestionTopic: topic });
        }

        return pickedQuestions.length;
      } catch (error) {
        console.error("Error fetching documents: ", error);
      } finally {
        set({ isLoading: false });
      }
    }
  },

  fetchReviewQuestions: async (system, topic) => {
    set({ isLoading: true });

    // Setting Index 0 for Questions
    set({ currentIndexReview: 0 });
    set({ reviewScore: 0 });
    try {
      const curUser = useCurrentUserStore.getState().getUser();
      const getPrevQuesRef = collection(
        db,
        "Users",
        curUser.id,
        "solved",
        system,
        topic
      );
      const docs = await getDocs(getPrevQuesRef);

      if (docs.docs.length > 0) {
        let questionsPicked = docs.docs.map((doc) => {
          return doc.data();
        });
        let finalQuestions = reviewQues(questionsPicked);
        // console.log(reviewQues(questionsPicked));
        set({ reviewQuestions: finalQuestions });

        set({ fetchedReviewQuestionSystem: system });

        set({ fetchedReviewQuestionTopic: topic });
      }

      console.log(docs.docs.length);
      return docs.docs.length;
    } catch (error) {
      console.error("Error fetching documents: ", error);
    } finally {
      set({ isLoading: false });
    }
  },

  submitQuestions: async () => {
    const batch = writeBatch(db);
    let system = get().fetchedQuestionSystem;
    let topic = get().fetchedQuestionTopic;
    const user = useCurrentUserStore.getState().getUser();
    const userId = user.id;
    const userDocRef = doc(db, "Users", userId);
    if (`${topic}` === `${system}all`) {
      set({ currentIndex: 0 });
      set({ fetchedQuestionSystem: "" });
      set({ fetchedQuestionTopic: "" });
    }
    try {
      get().questions.forEach((q) => {
        const docRef = doc(
          db, // The Firestore database instance
          "Users", // Collection name
          userId,
          "solved",
          system,
          topic,
          q.id
        );
        const data = { ...q, submittedOn: serverTimestamp() };
        batch.set(docRef, data); // Add to batch
      });
      // Update User
      const userSolvedTopics = user.solvedTopics;
      console.log(user);

      console.log("User solved Topics", userSolvedTopics);

      // Check if the system already exists
      const systemIndex = userSolvedTopics.findIndex((entry) => entry[system]);
      console.log("System is there?", systemIndex);

      if (systemIndex === -1) {
        // System does not exist, add it with the topics
        userSolvedTopics.push({ [system]: [topic] });
        console.log(userSolvedTopics);
      } else {
        // System exists, update its topics array
        const existingTopics = userSolvedTopics[systemIndex][system];

        // Check if the topic already exists
        if (!existingTopics.includes(topic)) {
          // Add the new topic to the system's array
          userSolvedTopics[systemIndex][system].push(topic);
          console.log(`Added topic: ${topic} to system: ${system}`);
          console.log(userSolvedTopics);
        } else {
          console.log(`Topic: ${topic} already exists in system: ${system}`);
          console.log(userSolvedTopics);
        }
      }

      // Update the Firestore document
      // console.log("After Submission", newUser);
      let score = user.totalScore;
      if (score === null) {
        score = get().score;
      } else {
        score += get().score;
      }

      let totalSolved = user.totalSolved;
      if (totalSolved === null) {
        totalSolved = 15;
      } else {
        totalSolved += 15;
      }

      const userDocRef = doc(db, "Users", userId);

      await updateDoc(userDocRef, {
        totalScore: score,
        solvedTopics: userSolvedTopics,
        totalSolved: totalSolved,
      });
      const newUser = {
        ...user,
        totalScore: score,
        totalSolved: totalSolved,
        solvedTopics: userSolvedTopics,
      };
      useCurrentUserStore.getState().updateUser(newUser);

      // Commit the batch operation
      await batch.commit();
      set({ currentIndex: 0 });
      set({ fetchedQuestionSystem: "" });
      set({ fetchedQuestionTopic: "" });
      // set({ score: 0 });
      // console.log("SAVED");
    } catch (error) {
      console.log(error.message);
    }
  },

  submitReviews: async () => {
    const batch = writeBatch(db); // Initialize batch
    let system = get().fetchedReviewQuestionSystem;
    let topic = get().fetchedReviewQuestionTopic;
    console.log(system);
    console.log(topic);
    if (topic === "reviewall") {
      set({ fetchedReviewQuestionSystem: "" });
      set({ currentIndexReview: 0 });
      set({ fetchedReviewQuestionTopic: "" });
    } else {
      try {
        get().reviewQuestions.forEach((q) => {
          const docRef = doc(
            db, // Firestore database instance
            "Users", // Collection name
            useCurrentUserStore.getState().getUser().id,
            "solved",
            system,
            topic,
            q.id
          );

          batch.update(docRef, {
            isReviewed: true,
            lastReviewed: serverTimestamp(), // Current timestamp
          });
        });

        // Commit batch update
        await batch.commit();
        set({ fetchedReviewQuestionSystem: "" });
        set({ currentIndexReview: 0 });
        set({ fetchedReviewQuestionTopic: "" });
        console.log("Batch update successful!");
      } catch (error) {
        console.error("Batch update failed:", error.message);
      }
    }
  },
  //

  fetchChallengeQuestions: async () => {
    set({ isLoading: true });
    // Setting Index 0 for Questions

    try {
      // Getting dailyChallenge ID First Here
      const querySnapshot = await getDocs(collection(db, `dailyChallenge`));
      const challengeID = querySnapshot.docs[0].id;
      console.log("ID OF Challenge", querySnapshot.docs[0].id);

      // Last Daily Challenge ID Now from User here

      const curUser = useCurrentUserStore.getState().getUser();

      const userChallengeId = curUser.lastDailyChallengeID;
      console.log(curUser);

      console.log(
        "Current User Challenge ID Current",
        curUser.lastDailyChallengeID
      );

      if (challengeID === userChallengeId) {
        return 0; // Length 0 which after checking navigates user to Leaderboard
      }
      let documents = querySnapshot.docs[0].data().questions;

      set({ currentChallengeIndex: 0 });
      set({ challengeQuestions: documents });
      set({ currentChallengeId: challengeID });
      return documents.length;
    } catch (error) {
      console.log("Error fetching documents: ", error);
      return 0;
    } finally {
      set({ isLoading: false });
    }
  },

  submitChallengeQuestions: async () => {
    try {
      const userId = useCurrentUserStore.getState().getUser().id;

      const userDocRef = doc(db, "Users", userId);

      await updateDoc(userDocRef, {
        lastDailyChallengeID: get().currentChallengeId,
        lastChallengeScore: get().scoreChallenge,
      });

      // Update User in Store
      const updatedUser = {
        ...useCurrentUserStore.getState().getUser(),
        lastDailyChallengeID: get().currentChallengeId,
      };
      useCurrentUserStore.getState().updateUser(updatedUser);
      console.log("UPDTAED USER", updatedUser);

      set({ currentChallengeIndex: 0 });
      set({ challengeQuestions: [] });
      set({ currentChallengeId: "" });
      console.log("Challenge updated successfully!");
    } catch (error) {
      console.error("Error updating challenge:", error.message);
    }
  },

  // Getting any current Question(study)
  getCurrentQuestion: () => {
    const { questions, currentIndex } = get();
    return questions[currentIndex];
  },

  // Getting any current Question(study)
  getReviewQuestion: () => {
    const { reviewQuestions, currentIndexReview } = get();
    return reviewQuestions[currentIndexReview];
  },

  // Getting any current Question(Challenge)
  getChallengeQuestion: () => {
    const { challengeQuestions, currentChallengeIndex } = get();
    return challengeQuestions[currentChallengeIndex];
  },

  // Getting any current Question(Challenge)
  getFetchedChallengeID: () => {
    const { currentChallengeId } = get();
    return currentChallengeId;
  },

  // Setting if user is reviwing/Studying/taking challenge
  setType: (type) => set({ type: type }),

  // Getting any current Question reviwing/Studying
  getCurrentType: () => {
    const { type } = get();
    return type;
  },

  // getFetchedQuestionSystem
  getfetchedQuestionSystem: () => {
    const { fetchedQuestionSystem } = get();
    return fetchedQuestionSystem;
  },

  // Getting Question Fetch Flag to not fetch/fetch require Questions again(study)
  getfetchedQuestionTopic: () => {
    const { fetchedQuestionTopic } = get();
    return fetchedQuestionTopic;
  },

  // Getting Question Fetch Flag to not fetch/fetch require Questions again(review)
  getfetchedReviewTopic: () => {
    const { fetchedReviewQuestionTopic } = get();
    return fetchedReviewQuestionTopic;
  },

  // For Review All
  setReviewAllQuestions: (questions) => {
    set({ isLoading: true });
    console.log("The len is", questions.length);

    // Setting Index 0 for Questions
    set({ currentIndexReview: 0 });
    set({ reviewQuestions: questions });
    set({ fetchedReviewQuestionSystem: "reviewall" });
    set({ fetchedReviewQuestionTopic: "reviewall" });
  },
}));

export default useQuesStore;
