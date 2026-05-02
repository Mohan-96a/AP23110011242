"use client";

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Chip,
  Box,
  Button,
  IconButton,
} from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

export default function NotificationCard({ notification }) {
  const [isRead, setIsRead] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const type = notification.Type || notification.type;
  const message = notification.Message || notification.message;
  const timestamp = notification.Timestamp || notification.timestamp;

  const getPriorityColor = (type) => {
    switch (type) {
      case 'Placement':
        return '#2196f3';
      case 'Result':
        return '#ff9800';
      case 'Event':
        return '#4caf50';
      default:
        return '#999';
    }
  };

  const formatTime = (ts) => {
    try {
      return new Date(ts).toLocaleString();
    } catch {
      return ts;
    }
  };

  return (
    <Card
      sx={{
        borderLeft: `5px solid ${getPriorityColor(type)}`,
        opacity: isRead ? 0.6 : 1,
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: 3,
        },
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
            gap: 1,
            mb: 1,
          }}
        >
          <Chip
            label={type}
            size="small"
            sx={{
              backgroundColor: getPriorityColor(type),
              color: '#fff',
              fontWeight: 'bold',
            }}
          />
          {isRead && <Chip label="Read" size="small" variant="outlined" />}
        </Box>

        <Typography variant="body1" sx={{ mb: 1, wordBreak: 'break-word' }}>
          {message}
        </Typography>

        <Typography variant="caption" color="textSecondary">
          {formatTime(timestamp)}
        </Typography>
      </CardContent>

      <CardActions
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'stretch', sm: 'center' },
          gap: 1,
          p: 2,
        }}
      >
        <Button
          size="small"
          fullWidth
          sx={{ width: { xs: '100%', sm: 'auto' } }}
          onClick={() => setIsRead(!isRead)}
          variant={isRead ? 'outlined' : 'contained'}
        >
          {isRead ? 'Mark Unread' : 'Mark Read'}
        </Button>
        <IconButton
          size="small"
          onClick={() => setIsSaved(!isSaved)}
          sx={{
            ml: { xs: 0, sm: 'auto' },
            alignSelf: { xs: 'flex-start', sm: 'auto' },
            color: isSaved ? '#ff9800' : 'inherit',
          }}
        >
          {isSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
        </IconButton>
      </CardActions>
    </Card>
  );
}
