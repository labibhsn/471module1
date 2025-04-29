const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/User');
const Auction = require('../models/Auction');
const Sale = require('../models/Sale');

// Helper function to parse date range from query
function parseDateRange(query) {
  let start = query.startDate ? new Date(query.startDate) : new Date('1970-01-01');
  let end = query.endDate ? new Date(query.endDate) : new Date();
  return { start, end };
}

// GET /admin/statistics?startDate=&endDate=&userCategory=
// Returns total sales, number of active users, auction success rate
router.get('/statistics', async (req, res) => {
  try {
    const { start, end } = parseDateRange(req.query);
    const userCategory = req.query.userCategory;

    // Filter users by category if provided
    const userFilter = userCategory ? { category: userCategory } : {};

    // Count active users (not suspended, created within date range)
    const activeUsersCount = await User.countDocuments({
      ...userFilter,
      isSuspended: false,
      createdAt: { $gte: start, $lte: end },
    });

    // Total sales amount within date range
    const sales = await Sale.aggregate([
      {
        $match: {
          saleDate: { $gte: start, $lte: end },
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$amount' },
          count: { $sum: 1 },
        },
      },
    ]);

    const totalSales = sales.length > 0 ? sales[0].totalAmount : 0;

    // Auction success rate = number of successful auctions / total auctions in date range
    const totalAuctions = await Auction.countDocuments({
      startDate: { $gte: start, $lte: end },
    });
    const successfulAuctions = await Auction.countDocuments({
      startDate: { $gte: start, $lte: end },
      success: true,
    });
    const auctionSuccessRate = totalAuctions > 0 ? (successfulAuctions / totalAuctions) * 100 : 0;

    res.json({
      totalSales,
      activeUsersCount,
      auctionSuccessRate,
    });
  } catch (err) {
    console.error('Error fetching statistics:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /admin/suspend-auction/:auctionId
// Suspends an auction by ID
router.post('/suspend-auction/:auctionId', async (req, res) => {
  try {
    const auctionId = req.params.auctionId;
    const auction = await Auction.findById(auctionId);
    if (!auction) {
      return res.status(404).json({ error: 'Auction not found' });
    }
    auction.isSuspended = true;
    await auction.save();
    res.json({ message: 'Auction suspended successfully' });
  } catch (err) {
    console.error('Error suspending auction:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /admin/warn-user/:userId
// Warns a user with a message
router.post('/warn-user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Warning message is required' });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    user.warnings.push({ message, date: new Date() });
    await user.save();
    res.json({ message: 'User warned successfully' });
  } catch (err) {
    console.error('Error warning user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
