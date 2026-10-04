function cleanText(text) {
  return text?.trim() || "Not provided";
}

export async function reflectOnThinking(decision, reasoning) {
  await new Promise((resolve) => setTimeout(resolve, 900));

  const d = cleanText(decision);
  const r = cleanText(reasoning);
  const text = `${d} ${r}`.toLowerCase();

  const has = (...words) => words.some((word) => text.includes(word));

  const priorities = [];
  const blindSpots = [];
  const assumptions = [];

  if (has("internship", "job", "company", "work", "career")) {
    priorities.push({
      factor: "Career growth",
      why: "Your reasoning gives significant weight to gaining practical experience and moving closer to your longer-term career goals."
    });
  }

  if (has("stipend", "salary", "money", "pay", "₹", "rs")) {
    priorities.push({
      factor: "Financial value",
      why: "The financial benefit appears to be an important part of what makes this option attractive."
    });
  }

  if (has("college", "class", "exam", "semester", "attendance", "assignment", "academic")) {
    priorities.push({
      factor: "Academic continuity",
      why: "Your decision is connected to your existing academic responsibilities, which may influence whether the opportunity is sustainable."
    });
  }

  if (has("learn", "learning", "skill", "mentor", "mentorship", "experience")) {
    priorities.push({
      factor: "Learning potential",
      why: "You appear to care about whether this choice will leave you with meaningful skills and experience, not just an immediate benefit."
    });
  }

  if (has("friend", "relationship", "boyfriend", "girlfriend", "love", "family")) {
    priorities.push({
      factor: "Relationships",
      why: "Your reasoning suggests that the effect this decision has on important relationships is part of what matters to you."
    });
  }

  if (has("buy", "purchase", "phone", "laptop", "car", "product", "shopping")) {
    priorities.push({
      factor: "Practical value",
      why: "Your reasoning appears focused on whether the benefits of this choice justify what you would give up to get it."
    });
  }

  if (priorities.length === 0) {
    priorities.push({
      factor: "Immediate benefits",
      why: "Your reasoning focuses primarily on what this option could give you in the near term."
    });
  }

  if (has("internship", "job", "work", "career")) {
    blindSpots.push({
      factor: "Quality of the experience",
      why: "A good company or job title does not guarantee meaningful work. The actual responsibilities, mentorship, feedback, and people around you may matter more."
    });
    blindSpots.push({
      factor: "Opportunity cost",
      why: "Accepting this option also means giving up time that could have gone toward academics, projects, competitions, or another opportunity."
    });
  } else {
    blindSpots.push({
      factor: "Opportunity cost",
      why: "Choosing one option automatically means giving up time, money, attention, or another possibility."
    });
  }

  if (has("college", "class", "exam", "semester", "attendance", "academic")) {
    blindSpots.push({
      factor: "Academic impact",
      why: "The schedule may look manageable initially, but sustained commitments can affect attendance, study time, assignments, exams, and recovery."
    });
  } else {
    blindSpots.push({
      factor: "Long-term fit",
      why: "An attractive option in the short term is not automatically the option that best supports where you want to be later."
    });
  }

  assumptions.push({
    factor: "The expected benefits will match reality",
    why: "Your reasoning relies partly on what you expect this option to provide. Those expectations are worth verifying before committing."
  });

  if (has("internship", "job", "career", "experience")) {
    assumptions.push({
      factor: "More experience automatically means more career value",
      why: "Experience is useful, but what you actually learn, build, and receive feedback on can matter more than simply having the experience."
    });
  } else {
    assumptions.push({
      factor: "The easiest option is the best option",
      why: "Convenience can be valuable, but it is worth checking whether it is actually aligned with what matters most to you."
    });
  }

  if (has("stipend", "salary", "money", "pay", "₹", "rs")) {
    assumptions.push({
      factor: "Financial benefit makes the trade-off worthwhile",
      why: "Money matters, but it may not compensate for hidden costs such as time, stress, commuting, or reduced performance elsewhere."
    });
  }

  const tradeOffs = [
    {
      factor: "Short-term gain vs. long-term value",
      why: "The option may provide an immediate benefit while changing how much time and energy remain for your longer-term goals."
    },
    {
      factor: "Opportunity vs. capacity",
      why: "Something can be a genuinely good opportunity and still be a poor fit if your current capacity is too limited to benefit from it."
    }
  ];

  if (has("college", "class", "exam", "semester", "academic")) {
    tradeOffs.push({
      factor: "Experience vs. academic performance",
      why: "The experience may strengthen your profile, but the workload could also compete with attendance, exams, assignments, or projects."
    });
  }

  const beforeYouDecide = [
    {
      factor: "Verify what you will actually do",
      why: "Ask for concrete responsibilities and examples of the work you would handle rather than relying only on the title."
    },
    {
      factor: "Check who will support you",
      why: "Find out who would mentor you, how often you receive feedback, and what you can realistically expect to learn."
    },
    {
      factor: "Map the real commitment",
      why: "Compare the hours, commute, deadlines, and energy required with your existing responsibilities."
    },
    {
      factor: "Define your deal-breakers",
      why: "Decide in advance what conditions would make you reconsider or walk away."
    }
  ];

  const questions = [
    {
      question: "If the most attractive benefit disappeared, would you still choose this?",
      why: "This helps separate the core value of the option from the single factor making it tempting."
    },
    {
      question: "What specifically will be different about you six months after choosing this?",
      why: "A concrete answer helps distinguish genuine growth from simply accumulating another experience."
    },
    {
      question: "What would make you regret this decision?",
      why: "Imagining failure conditions can reveal risks that are easy to miss while focusing on the upside."
    },
    {
      question: "What information would change your mind?",
      why: "Knowing this before deciding helps you identify the facts you still need instead of looking only for confirmation."
    }
  ];

  const alternativePerspectives = [
    {
      factor: "The option could genuinely be valuable",
      why: "There may be real benefits that deserve to be taken seriously rather than dismissed simply because risks exist."
    },
    {
      factor: "Good does not always mean good for you right now",
      why: "An opportunity can be objectively attractive while still being poorly timed for your current priorities and capacity."
    },
    {
      factor: "There may be a third option",
      why: "The choice may not be limited to yes or no. Consider negotiating conditions, delaying the decision, modifying the commitment, or finding another route."
    }
  ];

  return {
    priorities,
    blindSpots,
    assumptions,
    tradeOffs,
    beforeYouDecide,
    questions,
    alternativePerspectives,
    _demo: true
  };
}