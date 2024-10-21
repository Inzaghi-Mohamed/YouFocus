'use client'

import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Edit, Trash2, Youtube } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

function EditCourseModal({ isOpen, onClose, course, onUpdate }) {
  const [title, setTitle] = useState(course?.title || '')
  const [description, setDescription] = useState(course?.description || '')
  const [progress, setProgress] = useState(course?.progress || 0)

  useEffect(() => {
    if (course) {
      setTitle(course.title)
      setDescription(course.description)
      setProgress(course.progress)
    }
  }, [course])

  const handleSubmit = (e) => {
    e.preventDefault()
    onUpdate({
      id: course.id,
      title,
      description,
      progress,
      notes: course.notes // Preserve existing notes
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Course</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Title</Label>
              <Input
                id="edit-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-progress">Progress</Label>
              <Input
                type="number"
                id="edit-progress"
                value={progress}
                onChange={(e) => setProgress(Number(e.target.value))}
                min="0"
                max="100"
                required
              />
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button type="submit">Update Course</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default function Courses() {
  const dispatch = useDispatch()
  const courses = useSelector((state) => state.courses)
  const user = useSelector((state) => state.user)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [progress, setProgress] = useState(0)
  const [editingCourse, setEditingCourse] = useState(null)

  useEffect(() => {
    dispatch({ type: 'FETCH_COURSES' })
  }, [dispatch])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch({
      type: 'ADD_COURSE',
      payload: { title, description, progress, notes: '' }
    })
    setTitle('')
    setDescription('')
    setProgress(0)
  }

  const handleUpdate = (course) => {
    setEditingCourse(course)
  }

  const handleUpdateSubmit = (updatedCourse) => {
    dispatch({
      type: 'UPDATE_COURSE',
      payload: updatedCourse
    })
    setEditingCourse(null)
  }

  const handleDelete = (courseId) => {
    dispatch({
      type: 'DELETE_COURSE',
      payload: courseId
    })
  }

  return (
    <div className="container mx-auto mt-20 px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Welcome, <span className='text-primary'>{user.username}!</span></h2>
      <h1 className="text-3xl font-bold mb-8 text-center">My Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left side: Course List */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Your Courses</h2>
          {courses.length === 0 ? (
            <p className="text-muted-foreground">No courses added yet.</p>
          ) : (
            <div className="space-y-4">
              {courses.map((course) => (
                <Card key={course.id}>
                  <CardHeader>
                    <CardTitle>{course.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{course.description}</p>
                    <div className="space-y-2">
                      <Label>Progress</Label>
                      <Progress value={course.progress} />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleUpdate(course)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(course.id)}>
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                    <Button variant="secondary" size="sm">
                      <Youtube className="w-4 h-4 mr-2" />
                      Search on YouTube
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Right side: Add Course Form */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Add New Course</h2>
          <Card>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="progress">Progress</Label>
                  <Input
                    type="number"
                    id="progress"
                    value={progress}
                    onChange={(e) => setProgress(Number(e.target.value))}
                    min="0"
                    max="100"
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Add Course</Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>

      <EditCourseModal
        isOpen={!!editingCourse}
        onClose={() => setEditingCourse(null)}
        course={editingCourse}
        onUpdate={handleUpdateSubmit}
      />
    </div>
  )
}