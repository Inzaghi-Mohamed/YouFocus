'use client'

import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Edit, Save, Trash2 } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function Notes() {
  const dispatch = useDispatch()
  const courses = useSelector((state) => state.courses)
  const [notes, setNotes] = useState({})
  const [editingNoteId, setEditingNoteId] = useState(null)
  const [deletingNoteId, setDeletingNoteId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const notesSufix = 'Notes'

  useEffect(() => {
    dispatch({ type: 'FETCH_COURSES' })
  }, [dispatch])

  useEffect(() => {
    if (courses.length > 0) {
      const initialNotes = courses.reduce((acc, course) => {
        acc[course.id] = course.notes || ''
        return acc
      }, {})
      setNotes(initialNotes)
      setIsLoading(false)
    }
  }, [courses])

  const handleNoteChange = (courseId, value) => {
    setNotes(prevNotes => ({
      ...prevNotes,
      [courseId]: value
    }))
  }

  const handleSaveNote = (courseId) => {
    const updatedCourse = courses.find(course => course.id === courseId)
    if (updatedCourse) {
      dispatch({
        type: 'UPDATE_COURSE',
        payload: { 
          ...updatedCourse,
          notes: notes[courseId]
        }
      })
    }
    setEditingNoteId(null)
  }

  const handleEditNote = (courseId) => {
    setEditingNoteId(courseId)
  }

  const handleDeleteNote = (courseId) => {
    setDeletingNoteId(courseId)
  }

  const confirmDeleteNote = () => {
    const updatedCourse = courses.find(course => course.id === deletingNoteId)
    if (updatedCourse) {
      dispatch({
        type: 'UPDATE_COURSE',
        payload: { 
          ...updatedCourse,
          notes: ''
        }
      })
    }
    setNotes(prevNotes => ({
      ...prevNotes,
      [deletingNoteId]: ''
    }))
    setDeletingNoteId(null)
  }

  if (isLoading) {
    return <div>Loading notes...</div>
  }

  return (
    <div className="container mx-auto mt-20 px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center">My Notes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id}>
            <CardHeader>
              <CardTitle> <span className='text-green-500'>{course.title.toUpperCase()}</span> - {notesSufix}</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={notes[course.id] || ''}
                onChange={(e) => handleNoteChange(course.id, e.target.value)}
                disabled={editingNoteId !== course.id}
                className="min-h-[128px]"
                placeholder="Take your notes here..."
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              {editingNoteId === course.id ? (
                <Button onClick={() => handleSaveNote(course.id)} variant="default">
                  <Save className="w-4 h-4 mr-2 " />
                  Save
                </Button>
              ) : (
                <Button onClick={() => handleEditNote(course.id)} variant="secondary">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              )}
              <Button onClick={() => handleDeleteNote(course.id)} variant="destructive">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <AlertDialog open={deletingNoteId !== null} onOpenChange={() => setDeletingNoteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete your entire note(s)?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the note for this course. But not the Note card !
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteNote} className='bg-red-500 hover:bg-red-600'>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}