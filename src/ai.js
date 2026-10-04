function cleanText(text) {
  return text?.trim() || "Not provided";
}

export async function reflectOnThinking(decision, reasoning) {
  // Small delay so the experience feels like MIRROR is actually thinking.
  await new Promise((resolve) => setTimeout(resolve, 1400));

  const d = cleanText(decision);
  const r = cleanText(reasoning);

  const lower = `${d} ${r}`.toLowerCase();

  const isInternship =
    lower.includes("internship") ||
    lower.includes("stipend") ||
    lower.includes("company") ||
    lower.includes("job");

  const isCollege =
    lower.includes("college") ||
    lower.includes("academic") ||
    lower.includes("exam") ||
    lower.includes("semester") ||
    lower.includes("class");

  const isMoney =
    lower.includes("money") ||
    lower.includes("stipend") ||
    lower.includes("salary") ||
    lower.includes("pay");

  const priorities = [];

  if (isMoney) {
    priorities.push({
      factor: "Financial value",
      why: "You appear to give meaningful weight to the financial benefit of this option."
    });
  }

  if (isInternship) {
    priorities.push({
      factor: "Industry experience",
      why: "Your reasoning suggests that gaining practical experience is an important part of why this option appeals to you."
    });
  }

  if (isCollege) {
    priorities.push({
      factor: "Academic continuity",
      why: "Your decision is connected to your existing college responsibilities, even if they are not the main reason you are considering it."
    });
  }

  if (priorities.length === 0) {
    priorities.push({
      factor: "Immediate benefits",
      why: "Your reasoning focuses on what this option could give you in the near term."
    });
  }

  const blindSpots = [
    {
      factor: "Opportunity cost",
      why: "Choosing this option also means giving up time and attention that could have gone toward other opportunities."
    },
    {
      factor: "Quality of the experience",
      why: "The visible benefits may be clear, but the actual day-to-day experience could depend heavily on the role, people, and responsibilities involved."
    }
  ];

  if (isCollege) {
    blindSpots.push({
      factor: "Academic impact",
      why: "The schedule may look manageable in theory, but sustained work hours can affect attendance, study time, assignments, and recovery."
    });
  } else {
    blindSpots.push({
      factor: "Long-term fit",
      why: "An attractive opportunity in the short term is not automatically the opportunity that best supports where you want to go next."
    });
  }

  const assumptions = [
    {
      factor: "More experience automatically means more career value",
      why: "Experience can be valuable, but what you actually learn, build, and receive feedback on may matter more than simply having the experience."
    },
    {
      factor: "The stated benefits will match reality",
      why: "Your reasoning appears to rely partly on expectations about what the opportunity will provide. Those expectations are worth verifying."
    }
  ];

  if (isMoney) {
    assumptions.push({
      factor: "A good stipend makes the opportunity worthwhile",
      why: "Financial value matters, but it may not compensate for costs such as time, stress, commuting, or reduced academic performance."
    });
  }

  const tradeOffs = [
    {
      factor: "Short-term gain vs. long-term value",
      why: "The option may provide immediate benefits while also changing what time and energy you have available for longer-term goals."
    },
    {
      factor: "Opportunity vs. capacity",
      why: "A good opportunity can still be a poor fit if your current responsibilities leave too little capacity to benefit from it."
    }
  ];

  const beforeYouDecide = [
    {
      factor: "Clarify the actual role",
      why: "Find out what you would actually do each week rather than relying only on the role title."
    },
    {
      factor: "Ask about mentorship",
      why: "Identify who would guide you, how often you would receive feedback, and what you would realistically learn."
    },
    {
      factor: "Map the schedule",
      why: "Compare the working hours with your college timetable, commute, assignments, exams, and study requirements."
    },
    {
      factor: "Check the exit conditions",
      why: "Understand what happens if the workload becomes incompatible with your academics or circumstances."
    }
  ];

  const questions = [
    {
      question: "If the stipend disappeared, would you still want this opportunity?",
      why: "This separates the financial attraction from the underlying value of the opportunity."
    },
    {
      question: "What specifically do you expect to be able to do after six months that you cannot do today?",
      why: "A concrete answer helps distinguish genuine learning from simply accumulating experience."
    },
    {
      question: "What would make you regret accepting this decision?",
      why: "Thinking about failure conditions can reveal risks that are easy to overlook when focusing on benefits."
    },
    {
      question: "Are you choosing this because it is genuinely a good fit, or because it feels safer than saying no?",
      why: "Sometimes the strongest-looking reason for a decision is actually avoidance of uncertainty."
    }
  ];

  const alternativePerspectives = [
    {
      factor: "The opportunity could be valuable",
      why: "It may genuinely provide useful experience, income, confidence, and exposure to professional work."
    },
    {
      factor: "The opportunity could also be mistimed",
      why: "Something can be objectively good while still being poorly aligned with your current academic workload or priorities."
    },
    {
      factor: "There may be a third option",
      why: "The decision may not have to be simply accept or reject. You could investigate modified hours, a different role, or another opportunity."
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