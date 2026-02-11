

# Challenge Play Experience - Full-Screen TikTok-Style Flow

## Overview
Build an immersive, full-screen challenge player with webcam integration, countdown timers, win/lose states, and post-challenge actions -- all styled like a TikTok/Reels experience.

## Flow Summary

1. **Countdown (5s)** -- Top half shows the original (normal) photo, bottom half shows the user's live webcam feed. A large countdown number sits between them. Copy says "Get ready..."
2. **Challenge active (10s)** -- The top photo swaps to the funny/transformed version. A timer counts down from 0:10. "Try not to laugh" text appears. User taps screen if they laugh (or timer runs out).
3. **Result: Caught** -- Red-tinted overlay on both halves. Bold "CAUGHT!" text in the center divider.
4. **Result: Survived** -- Green-tinted overlay on both halves. Bold "YOU WON!" text in the center divider.
5. **Post-challenge** -- Top half returns to original photo with a play button overlay and "Watch your recording" label. Bottom half shows the frozen last frame of webcam. Right-side action buttons: Again, Save, Share, Next.

## Navigation
- **Home icon** (top-left) returns to the main feed
- **+ icon** (top-right) goes to the Create flow
- **Next button** (bottom-right, pink circle with chevron-down) loads the next challenge
- These persist across all states

## Technical Details

### New Component: `src/components/ChallengePlayer.tsx`
A full-screen component that manages the entire challenge lifecycle.

**State machine:**
```text
idle --> countdown (5s) --> active (10s) --> result (caught/survived) --> review
```

**Props:**
- `challengeImage`: the normal photo URL
- `funnyImage`: the transformed photo URL  
- `onHome`: navigate back
- `onCreate`: navigate to create
- `onNext`: load next challenge

**Key implementation details:**
- Uses `navigator.mediaDevices.getUserMedia({ video: true })` to access the front camera and render into a `<video>` element
- Countdown and challenge timers use `setInterval` with `useEffect` cleanup
- "Caught" is triggered by the user tapping a "I laughed" button (since real smile detection would require ML) -- or the user can let the timer run out to win
- Result overlays use absolute positioning with semi-transparent red (`bg-red-500/30`) or green (`bg-green-500/30`) tint over the entire screen
- Recording playback is simulated (show the original photo with a play icon overlay, since actual MediaRecorder is complex and not core to the MVP)

### Layout Structure (all states)
```text
+----------------------------------+
| [Home]                    [+]    |  <- fixed top nav
|                                  |
|       Challenge Image            |  <- top ~45% of screen
|       (normal or funny)          |
|                                  |
|---------- divider strip ---------|  <- countdown/timer/result text
|                                  |
|       Webcam / Recording         |  <- bottom ~45% of screen
|                                  |
|                         [Next]   |  <- floating bottom-right
+----------------------------------+
```

### Integration with VariantB2
- Clicking any challenge card or the featured card enters the `ChallengePlayer` with that challenge's images
- Add state to `VariantB2` to track `activeChallenge` (index or null)
- When `activeChallenge` is set, render `ChallengePlayer` full-screen instead of the feed
- "Home" sets `activeChallenge` back to null
- "Next" increments the challenge index

### Post-Challenge Action Buttons (right side, stacked vertically like TikTok)
- **Again** (rotate icon) -- restarts the same challenge
- **Save** (download icon) -- placeholder/toast "Saved!"
- **Share** (share icon) -- opens share sheet (reuse logic from CreateFlow)
- **Next** (pink circle, chevron-down) -- always visible, loads next challenge

### Styling Notes
- Dark background, full viewport height (`h-screen`, no scrolling)
- Divider strip between photo and webcam is a thin bar (~40-50px) with the timer/text centered
- Result text ("CAUGHT!" / "YOU WON!") uses bold white text with text-shadow for readability
- Color overlays animate in with a fade transition
- All icons use `lucide-react` (Home, Plus, RotateCcw, Download, Share2, ChevronDown)

### Files Changed
1. **Create** `src/components/ChallengePlayer.tsx` -- the full challenge player component
2. **Edit** `src/pages/VariantB2.tsx` -- add `activeChallenge` state, wire up card clicks to open the player, conditionally render the player full-screen

